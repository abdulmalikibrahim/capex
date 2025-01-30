<?php
class API extends MY_Controller {
    function dataCapex()
    {
        $this->form_validation->set_rules('shop', 'Shop', 'trim|required');
        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }
        $shop = $this->input->post("shop");

        $dataPlan = [];
        $plan = $this->getDataCapex("plan",$shop);
        foreach ($plan as $plan) {
            $dataPlan[] = floatval(round($plan->Budget,2));
        }

        $dataActual = [];
        $actual = $this->getDataCapex("actual",$shop);
        foreach ($actual as $actual) {
            $dataActual[] = floatval(round($actual->Actual,2));
        }

        $dataBFOS = [];
        $bfos = $this->getDataCapex("bfos",$shop);
        foreach ($bfos as $bfos) {
            $dataBFOS[] = floatval(round($bfos->Nominal_BFOS,2));
        }

        $dataBTOS = [];
        $btos = $this->getDataCapex("btos",$shop);
        foreach ($btos as $btos) {
            $dataBTOS[] = floatval(round($btos->Nominal_BTOS,2));
        }

        $fb = ["statusCode" => 200, "res" => ["plan" => $dataPlan, "actual" => $dataActual, "bfos" => $dataBFOS, "btos" => $dataBTOS]];
        $this->fb($fb);
    }

    private function getDataCapex($tipe,$shop)
    {
        if($tipe == "plan"){
            $columnValue = "Budget";
            $columnMonth = "Month_Plan";
        }else if($tipe == "actual"){
            $columnValue = "Actual";
            $columnMonth = "Month";
        }else if($tipe == "bfos"){
            $columnValue = "Nominal_BFOS";
            $columnMonth = "Month_BFOS";
        }else if($tipe == "btos"){
            $columnValue = "Nominal_BTOS";
            $columnMonth = "Month_BTOS";
        }

        $query = "
        WITH months AS (
            SELECT 1 AS $columnMonth UNION ALL
            SELECT 2 UNION ALL
            SELECT 3 UNION ALL
            SELECT 4 UNION ALL
            SELECT 5 UNION ALL
            SELECT 6 UNION ALL
            SELECT 7 UNION ALL
            SELECT 8 UNION ALL
            SELECT 9 UNION ALL
            SELECT 10 UNION ALL
            SELECT 11 UNION ALL
            SELECT 12
        )
        SELECT 
            m.$columnMonth, 
            COALESCE(SUM(d.$columnValue), 0) AS $columnValue
        FROM 
            months m
        LEFT JOIN `datacapex` d 
            ON m.$columnMonth = d.$columnMonth AND d.shop = '".$shop."'
        GROUP BY m.$columnMonth
        ORDER BY FIELD(m.$columnMonth, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3);
        ";
        $data = $this->model->query_exec($query,"result");
        return $data;
    }

    function getDataTable()
    {
        $this->form_validation->set_rules('shop', 'Shop', 'trim|required');
        $this->form_validation->set_rules('tipe', 'Tipe', 'trim|required');
        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }

        $shop = $this->input->post("shop");
        $tipe = $this->input->post("tipe");
        if($tipe == "plan"){
            $returnData = $this->model->gd("datacapex","Id,Category,Invest,Month_Plan as Month,Budget","shop = '$shop' AND Budget != ''","result");
        }else if($tipe == "actual"){
            $returnData = $this->model->gd("datacapex","Id,Category,Invest,Month_Plan as Month,Actual as Budget","shop = '$shop' AND Actual != '' AND BTOS = ''","result");
        }else if($tipe == "bfos"){
            $returnData = $this->model->gd("datacapex","Id,Category,Invest,BFOS as OtherShop,Month_BFOS as Month,Nominal_BFOS as Budget","shop = '$shop' AND BFOS != ''","result");
        }else if($tipe == "btos"){
            $returnData = $this->model->gd("datacapex","Id,Category,Invest,BTOS as OtherShop,Month_BTOS as Month,Nominal_BTOS as Budget","shop = '$shop' AND BTOS != ''","result");
        }
        $fb = ["statusCode" => 200, "res" => $returnData];
        $this->fb($fb);
    }

    private function checkInputCapex()
    {
        $tipe = $this->input->post("tipe");
        $this->form_validation
            ->set_rules('id',"ID","trim|required")
            ->set_rules('category',"Category","trim|required")
            ->set_rules('invest',"Invest","trim|required")
            ->set_rules('month',"Month","trim|required") 
            ->set_rules('budget',"Budget","trim|required")
            ->set_rules('tipe',"Tipe","trim|required")
            ->set_rules('shop',"Shop","trim|required");
        if($tipe == "bfos" || $tipe == "btos"){
            $this->form_validation->set_rules('otherShop',"Other Shop","trim");
        }
        
        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }
    }

    function prosesCapex($method) //METHOD ADD OR UPDATE
    {
        $this->checkInputCapex();

        $id = $this->input->post("id");
        $category = $this->input->post("category");
        $invest = $this->input->post("invest");
        $month = $this->input->post("month");
        $otherShop = $this->input->post("otherShop");
        $budget = str_replace(",",".",$this->input->post("budget"));
        $shop = $this->input->post("shop");
        $tipe = $this->input->post("tipe");

        $input = [
            "Category" => $category,
            "Invest" => $invest,
            "shop" => $shop,
        ];
        if($tipe == "plan"){
            $input["Month_Plan"] = $month;
            $input["Budget"] = $budget;
        }else if($tipe == "actual"){
            $input["Month"] = $month;
            $input["Actual"] = $budget;
        }else if($tipe == "bfos"){
            $input["BFOS"] = $otherShop;
            $input["Month_BFOS"] = $month;
            $input["Nominal_BFOS"] = $budget;
        }else if($tipe == "btos"){
            $input["BTOS"] = $otherShop;
            $input["Month_BTOS"] = $month;
            $input["Nominal_BTOS"] = $budget;
        }

        if($method == "update"){
            $proses = $this->model->update("datacapex","Id = '$id'",$input);
        }else if($method == "add"){
            $proses = $this->model->insert("datacapex",$input);
        }
        if($proses){
            $fb = ["statusCode" => 200, "res" => "Data berhasil di update"];
        }else{
            $fb = ["statusCode" => 500, "res" => "Data gagal di update"];
        }
        $this->fb($fb);
    }

    function deleteCapex()
    {
        $this->form_validation->set_rules('id',"ID","trim|required");
        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }

        $id = $this->input->post("id");
        $delete = $this->model->delete("datacapex","id = '$id'");
        if($delete){
            $fb = ["statusCode" => 200, "res" => "Data berhasil di hapus"];
        }else{
            $fb = ["statusCode" => 500, "res" => "Data gagal di hapus"];
        }
        $this->fb($fb);
    }
}
