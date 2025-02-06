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

    function getDataCapexAdd()
    {
        $shop = $this->input->post("shop");
        $month_3 = $this->input->post("month_3");
        $month = $month_3;
        if($month_3 == "01") {
            $month = 13;
        }else if($month_3 == "02") {
            $month = 14;
        }else if($month_3 == "03") {
            $month = 15;
        }
        $dataInvest = ["Improvement","Replacement"];

        $newDataCallBack["Improvement"] = [];
        $newDataCallBack["Replacement"] = [];
        foreach ($dataInvest as $key => $value) {
            $getData = $this->model->gd("datacapex","*","shop = '$shop' AND Budget != '' AND Invest = '$value' AND Month_Plan <= $month","result");
            foreach ($getData as $row) {
                $actual = $this->model->gd("datacapex","SUM(Actual) as total","shop = '$shop' AND (activity_BTOS = '".$row->Id."' OR activity_BFOS = '".$row->Id."')","row");
                $bfosSelf = $this->model->gd("datacapex","SUM(Nominal_BFOS) as total","BFOS = '$shop' AND activity_BFOS = '".$row->Id."'","row");
                $ActualBudget = !empty($row->Actual) ? $row->Actual : 0;
                $ActualBFOSorBTOS = $actual->total + $bfosSelf->total;
                $mPlan = $row->Month_Plan+3;
                $date = "2020-".$mPlan."-01";
                $budget = $row->Budget - $ActualBudget - $ActualBFOSorBTOS;
                $prevUsage = $ActualBudget + $ActualBFOSorBTOS;
                $MonthPlan = date("M",strtotime($date));
                $full = $budget <= 0 ? "full" : "";
                $class = $budget <= 0 ? "bg-secondary text-light" : "";
                $newDataCallBack[$value][] = [
                    "id" => $row->Id,
                    "category" => $row->Category,
                    "planBudget" => $row->Budget,
                    "prevUsage" => round($prevUsage,3),
                    "budget" => round($budget,3),
                    "monthPlan" => $MonthPlan,
                    "full" => $full,
                    "class" => $class
                ];
            }
        }
        $fb = ["statusCode" => 200, "res" => $newDataCallBack];
        $this->fb($fb);
    }

    function saveDataActivity()
    {
        // Ambil raw JSON dari body request
        $jsonData = file_get_contents("php://input");

        // Ubah JSON menjadi array asosiatif
        $data = json_decode($jsonData, true);

        // Cek apakah JSON valid
        if (!is_array($data)) {
            $fb = ["statusCode" => 500, "res" => "Invalid request JSON"];
            $this->fb($fb);
        }

        $monthActual = (date("m")*1);
        $ia = $data["ia"] ?? null;
        if(empty($ia)){
            $fb = ["statusCode" => 500, "res" => "IA tidak boleh kosong"];
            $this->fb($fb);
        }
        $shop = $data["shop"] ?? null;
        $investment = $data["investment"] ?? null;
        $description = $data["description"] ?? null;
        $useBudget = isset($data["useBudget"]) ? json_decode($data["useBudget"], true) : [];
        $useBudgetOther = isset($data["useBudgetOther"]) ? json_decode($data["useBudgetOther"], true) : [];

        $getIANumber = $this->model->gd("datacapex","Id","No_IA = '$ia' AND shop = '$shop'","row");
        $getCategory = $this->model->gd("datacapex","Id,Category,shop","Category = '$description' AND shop = '$shop'","row");
        if(!empty($useBudget) && is_array($useBudget)){
            foreach ($useBudget as $key => $value) {
                if($getCategory->Id == $key){
                    //UPDATE ACTUAL
                    $submitActual = [
                        "Actual" => $value,
                        "Month" => $monthActual,
                        "No_IA" => $ia,
                    ];
                    $proses = $this->model->update("datacapex","id = '$key'",$submitActual);
                    if(!$proses){
                        $fb = ["statusCode" => 500, "res" => "Gagal update data actual"];
                        $this->fb($fb);
                    }
                }else{
                    //UPDATE BFOS
                    $datasubmit = [
                        "Category" => $description,
                        "Invest" => $investment,
                        "BFOS" => $shop,
                        "activity_BFOS" => $key,
                        "Nominal_BFOS" => $value,
                        "Month_BFOS" => $monthActual,
                        "No_IA" => $ia,
                        "shop" => $shop
                    ];
                    if(!empty($getIANumber->Id)){
                        //GET DATA ID BY ACTIVITY BFOS
                        $idBFOS = $this->model->gd("datacapex","Id","activity_BFOS = '$key' AND shop = '$shop' AND No_IA = '$ia'","row");
                        $proses = $this->model->update("datacapex","Id = '$idBFOS->Id'",$datasubmit);
                    }else{
                        $proses = $this->model->insert("datacapex",$datasubmit);
                    }
                    if(!$proses){
                        $fb = ["statusCode" => 500, "res" => "Gagal input data BFOS"];
                        $this->fb($fb);
                    }
                }
            }
        }

        if(!empty($useBudgetOther) && is_array($useBudgetOther)){
            foreach ($useBudgetOther as $key => $value) {
                $getDetail = $this->model->gd("datacapex","id,shop","id = '$key'","row");
                //INPUT BTOS
                $dataSubmitBTOS = [
                    "Category" => $description,
                    "Invest" => $investment,
                    "BTOS" => $shop,
                    "Actual" => $value,
                    "Nominal_BTOS" => $value,
                    "activity_BTOS" => $key,
                    "Month_BTOS" => $monthActual,
                    "No_IA" => $ia,
                    "shop" => $getDetail->shop,
                ];
                
                //INPUT BFOS
                $dataSubmitBFOS = [
                    "Category" => $description,
                    "Invest" => $investment,
                    "BFOS" => $getDetail->shop,
                    "Nominal_BFOS" => $value,
                    "activity_BFOS" => $key,
                    "Month_BFOS" => $monthActual,
                    "No_IA" => $ia,
                    "shop" => $shop,
                ];
                
                if(!empty($getIANumber->Id)){
                    //GET DATA ID BY ACTIVITY BTOS
                    $idBTOS = $this->model->gd("datacapex","Id","activity_BTOS = '$key' AND shop = '$getDetail->shop' AND No_IA = '$ia'","row");
                    $proses = $this->model->update("datacapex","Id = '$idBTOS->Id'",$dataSubmitBTOS);
                    //GET DATA ID BY ACTIVITY BFOS
                    $idBFOS = $this->model->gd("datacapex","Id","activity_BFOS = '$key' AND shop = '$shop' AND No_IA = '$ia'","row");
                    $proses = $this->model->update("datacapex","Id = '$idBFOS->Id'",$dataSubmitBFOS);
                }else{
                    $proses = $this->model->insert("datacapex",$dataSubmitBFOS);
                    $proses = $this->model->insert("datacapex",$dataSubmitBTOS);
                }
                if(!$proses){
                    $fb = ["statusCode" => 500, "res" => "Gagal input data BTOS"];
                    $this->fb($fb);
                }
            }
        }

        $fb = ["statusCode" => 200, "res" => "Data berhasil diupdate"];
        $this->fb($fb);
    }

    function getShop($return = false)
    {
        $shop = $this->model->gd("shop","shop","id !=","result");
        $fb = ["statusCode" => 200, "res" => $shop];
        if($return){
            return $fb; 
        }else{
            $this->fb($fb); 
        }
    }

    private function formatingNumber($number)
    {
        $format = str_replace(",00","",number_format(round($number,2),2,",","."));
        return $format;
    }

    function getDataReporting()
    {
        $getShop = $this->getShop(true);
        $dataShop = $getShop["res"];
        $invest = ["Improvement","Replacement"];
        $dataResult = [];
        foreach ($dataShop as $key => $value) {
            $shop = $value->shop;
            foreach ($invest as $kInvest => $vInvest) {
                //CARI UNTUK ROWSPAN TABLE SHOP TITLE
                $countData = $this->model->gd("datacapex","COUNT(id) as rowData","shop = '$shop' AND Invest = '$vInvest' AND (Actual != '' OR BFOS != '')","row");
                $rowSpan = ($countData->rowData + 1); //+3 UNTUK COVER ROW YANG LAIN
                $totalPlan = $this->model->gd("datacapex","SUM(Budget) as total","shop = '$shop' AND Invest = '$vInvest'","row");
                $totalActual = $this->model->gd("datacapex","SUM(Actual) as total","shop = '$shop' AND Invest = '$vInvest'","row");
                $totalBFOS = $this->model->gd("datacapex","SUM(Nominal_BFOS) as total","shop = '$shop' AND Invest = '$vInvest'","row");
                $totalBTOS = $this->model->gd("datacapex","SUM(Nominal_BTOS) as total","shop = '$shop' AND Invest = '$vInvest'","row");
                $dataSummaryMonth = [];
                for ($i=1; $i <= 12; $i++) { 
                    $getDataActual = $this->model->gd("datacapex","SUM(Actual) as total","shop = '$shop' AND Invest = '$vInvest' AND Month = '$i'","row");
                    $getDataBTOS = $this->model->gd("datacapex","SUM(Nominal_BTOS) as total","shop = '$shop' AND Invest = '$vInvest' AND Month_BTOS = '$i'","row");
                    $totalActualMonth = empty($getDataActual->total) ? 0 : $getDataActual->total;
                    $totalBTOSMonth = empty($getDataBTOS->total) ? 0 : $getDataBTOS->total;
                    $dataSummaryMonth[$i] = $this->formatingNumber($totalActualMonth + $totalBTOSMonth);
                }

                $dataResult[$shop][$vInvest] = [
                    "rowSpan" => ($rowSpan+1),
                    "totalPlan" => $this->formatingNumber($totalPlan->total),
                    "totalActual" => $this->formatingNumber($totalActual->total),
                    "totalRemainBudget" => $this->formatingNumber(($totalPlan->total - $totalActual->total)),
                    "totalBFOS" => $this->formatingNumber($totalBFOS->total),
                    "totalBTOS" => $this->formatingNumber($totalBTOS->total),
                    "data" => [],
                    "dataSummaryMonth" => $dataSummaryMonth
                ];

                $data = $this->model->gd("datacapex","*","shop = '$shop' AND Invest = '$vInvest' AND (Actual != '' OR BFOS != '')","result");
                if(empty($data)){
                    continue;
                }

                $dataUsage = []; //MENGENOLKAN NILAI DATA USAGE
                foreach ($data as $row) {
                    $dataBFOS = $this->model->gd("datacapex","SUM(Nominal_BFOS) as total","activity_BFOS = '$row->Id'","row");
                    $type = "";
                    $usage = "";
                    $month = "";
                    $keterangan = "";
                    if(!empty($row->Actual) && !empty(!empty($row->Month))){
                        $type = "Actual";
                        $usage = $row->Actual;
                        $month = $row->Month;
                    }else if(!empty($row->BFOS)){
                        $type = "BFOS";
                        $usage = $row->Nominal_BFOS;
                        $month = $row->Month_BFOS;
                        $getDataBFOS = $this->model->gd("datacapex","Category","Id = '$row->Id'","row");
                        $keterangan = "Budget From : ".$row->BFOS." (".$getDataBFOS->Category.")";
                    }else if(!empty($row->BTOS)){
                        $type = "BTOS";
                        $usage = $row->Nominal_BTOS;
                        $month = $row->Month_BTOS;
                        $getDataBTOS = $this->model->gd("datacapex","Category","Id = '$row->Id'","row");
                        $keterangan = "Budget For : ".$row->BTOS." (".$getDataBTOS->Category.")";
                    }
                    $remainBudget = (empty($row->Budget) ? 0 : $row->Budget) - ((empty($row->Actual) ? 0 : $row->Actual) + (empty($dataBFOS->total) ? 0 : $dataBFOS->total));
                    $dataUsage[] = [
                        "type" => $type,
                        "category" => $row->Category,
                        "plan" => $row->Budget,
                        "remainBudget" => $remainBudget > 0 ? $this->formatingNumber($remainBudget) : "",
                        "month" => intval($month),
                        "usage" => floatval($usage),
                        "ia" => $row->No_IA,
                        "keterangan" => $keterangan
                    ];

                    $dataResult[$shop][$vInvest]["data"] = $dataUsage;
                }
            }
        }
        $fb = ["statusCode" => 200, "res" => $dataResult];
        $this->fb($fb);
    }
}
