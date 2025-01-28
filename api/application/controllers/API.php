<?php
class API extends MY_Controller {
    function getCabor()
    {
        $this->form_validation->set_rules('code', 'Code Cabor', 'trim|required');
        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }

        $code = $this->input->post("code");
        $getData = $this->model->gd("cabor","*","code = '$code'","row");
        $fb = ["statusCode" => 200, "res" => $getData];
        $this->fb($fb);
    }
    
    function updateScore()
    {
        $this->form_validation
            ->set_rules('id', 'ID', 'integer|trim|required')
            ->set_rules('team', 'Team', 'trim|required')
            ->set_rules('score', 'Score', 'integer|trim|required');

        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }

        $team = $this->input->post("team");
        $score = $this->input->post("score");
        $id = $this->input->post("id");
        if($team == "team1"){
            $columnScore = "score_team1";
        }else{
            $columnScore = "score_team2";
        }
        $dataUpdate = [$columnScore => $score];
        $updateData = $this->model->update("jadwal_acara","id = '$id'",$dataUpdate);
        $fb = ["statusCode" => 200, "res" => "Score berhasil update"];
        $this->fb($fb);
    }
    
    function updateWinner()
    {
        $this->form_validation
            ->set_rules('id', 'ID', 'integer|trim|required')
            ->set_rules('team1', 'Team 1', 'trim|required')
            ->set_rules('team2', 'Team 2', 'trim|required')
            ->set_rules('namaTeam', 'Nama Team', 'trim|required');

        if ($this->form_validation->run() === FALSE) {
            $fb = ["statusCode" => 500, "res" => validation_errors()];
            $this->fb($fb);
        }

        $id = $this->input->post("id");
        $team1 = $this->input->post("team1");
        $team2 = $this->input->post("team2");
        $namaTeam = $this->input->post("namaTeam");

        if($namaTeam == $team1){
            $dataUpdate = [
                "winner" => $team1,
                "loose" => $team2
            ];
        }else{
            $dataUpdate = [
                "winner" => $team2,
                "loose" => $team1
            ];
        }
        
        $updateData = $this->model->update("jadwal_acara","id = '$id'",$dataUpdate);
        $fb = ["statusCode" => 200, "res" => "Winner berhasil update"];
        $this->fb($fb);
    }

    function getRundown()
    {
        $getData = $this->model->join_data("jadwal_acara","cabor","jadwal_acara.code_cabor=cabor.code","*","jadwal_acara.id != '' AND team1 != '' AND team2 != '' ORDER BY mulai, lokasi ASC","result");
        $currentTime = strtotime(date("Y-m-d H:i:s"));
        // $currentTime = strtotime("08:40:00");
        $dataRundown = [];
        if(!empty($getData)){
            foreach ($getData as $getData) {
                $team1 = $getData->team1;
                if(substr_count($team1,"#T") > 0){
                    $team1 = $getData->team1;
                    if($getData->tipe_winner != "3"){
                        $getTeam1 = $this->model->gd("jadwal_acara","winner","kode = '$team1'","row");
                        $team1 = !empty($getTeam1->winner) ? $getTeam1->winner : "-";
                    }else{
                        $getTeam1 = $this->model->gd("jadwal_acara","loose","kode = '$team1'","row");
                        $team1 = !empty($getTeam1->loose) ? $getTeam1->loose : "-";
                    }
                }
                
                $team2 = $getData->team2;
                if(substr_count($team2,"#T") > 0){
                    if($getData->tipe_winner != "3"){
                        $getTeam2 = $this->model->gd("jadwal_acara","winner","kode = '$team2'","row");
                        $team2 = !empty($getTeam2->winner) ? $getTeam2->winner : "-";
                    }else{
                        $getTeam2 = $this->model->gd("jadwal_acara","loose","kode = '$team2'","row");
                        $team2 = !empty($getTeam2->loose) ? $getTeam2->loose : "-";
                    }
                }

                $status = "";
                if(strtotime($getData->mulai) > $currentTime){
                    $status = "upcoming";
                }else if(strtotime($getData->selesai) >= $currentTime && strtotime($getData->mulai) <= $currentTime){
                    $status = "playing";
                }else if(strtotime($getData->selesai) < $currentTime){
                    $status = "finished";
                }

                $tipeWinner = !empty($getData->tipe_winner) ? $getData->tipe_winner : "other";
                $dataRundown[$getData->code][] = [
                    "cabor" => strtoupper($getData->cabor),
                    "code_cabor" => $getData->code_cabor,
                    "mulai" => date("H:i",strtotime($getData->mulai)),
                    "selesai" => $getData->selesai,
                    "durasi" => $getData->durasi,
                    "team1" => $team1,
                    "team2" => $team2,
                    "score_team1" => $getData->score_team1,
                    "score_team2" => $getData->score_team2,
                    "tipe_winner" => $tipeWinner,
                    "lokasi" => $getData->lokasi,
                    "picture" => $getData->picture,
                    "status" => $status,
                    "winner" => $getData->winner,
                ];
            }
        }
        $fb = ["statusCode" => 200, "res" => $dataRundown];
        $this->fb($fb);
    }

    function getCurrentRundown()
    {
        if(empty($this->input->get("input"))){
            $getData = $this->model->join_data("jadwal_acara","cabor","jadwal_acara.code_cabor=cabor.code","*","jadwal_acara.id != '' AND team1 != '' AND team2 != '' AND active = '1' ORDER BY cabor, mulai, lokasi ASC","result");
        }else{
            $getData = $this->model->join_data("jadwal_acara","cabor","jadwal_acara.code_cabor=cabor.code","*","jadwal_acara.id != '' AND team1 != '' AND team2 != '' ORDER BY cabor, mulai, lokasi ASC","result");
        }
        $currentTime = date("H:i:s");
        $dataRundown = [];
        if(!empty($getData)){
            foreach ($getData as $getData) {
                $team1 = $getData->team1;
                if(substr_count($team1,"#T") > 0){
                    $team1 = $getData->team1;
                    if($getData->tipe_winner != "3"){
                        $getTeam1 = $this->model->gd("jadwal_acara","winner","kode = '$team1'","row");
                        $team1 = !empty($getTeam1->winner) ? $getTeam1->winner : "-";
                    }else{
                        $getTeam1 = $this->model->gd("jadwal_acara","loose","kode = '$team1'","row");
                        $team1 = !empty($getTeam1->loose) ? $getTeam1->loose : "-";
                    }
                }
                
                $team2 = $getData->team2;
                if(substr_count($team2,"#T") > 0){
                    if($getData->tipe_winner != "3"){
                        $getTeam2 = $this->model->gd("jadwal_acara","winner","kode = '$team2'","row");
                        $team2 = !empty($getTeam2->winner) ? $getTeam2->winner : "-";
                    }else{
                        $getTeam2 = $this->model->gd("jadwal_acara","loose","kode = '$team2'","row");
                        $team2 = !empty($getTeam2->loose) ? $getTeam2->loose : "-";
                    }
                }

                $status = "";
                if(!empty($this->input->get("input"))){
                    if(strtotime($getData->mulai) > $currentTime){
                        $status = "upcoming";
                    }else if(strtotime($getData->selesai) >= $currentTime && strtotime($getData->mulai) <= $currentTime){
                        $status = "playing";
                    }else if(strtotime($getData->selesai) < $currentTime){
                        $status = "finished";
                    }
                }else{
                    $status = "playing";
                }
                
                $tipeWinner = !empty($getData->tipe_winner) ? $getData->tipe_winner : "other";
                $data = [
                    "id" => $getData->id,
                    "cabor" => strtoupper($getData->cabor),
                    "code_cabor" => $getData->code_cabor,
                    "mulai" => date("H:i",strtotime($getData->mulai)),
                    "selesai" => date("H:i",strtotime($getData->selesai)),
                    "durasi" => $getData->durasi,
                    "team1" => $team1,
                    "team2" => $team2,
                    "tipe_winner" => $tipeWinner,
                    "lokasi" => $getData->lokasi,
                    "picture" => $getData->picture,
                    "status" => $status,
                    "winner" => $getData->winner,
                    "score_team1" => ($getData->score_team1 != NULL) ? $getData->score_team1 : "0",
                    "score_team2" => ($getData->score_team2 != NULL) ? $getData->score_team2 : "0",
                    "active" => $getData->active,
                ];
                if(empty($this->input->get("input"))){
                    $dataRundown[] = $data;
                }else{
                    $dataRundown[$getData->code][] = $data;
                }
            }
        }
        $fb = ["statusCode" => 200, "res" => $dataRundown];
        $this->fb($fb);
    }

    public function updateEventBerlangsung()
    {
        $id = $this->input->post("id");
        $active = $this->input->post("active");

        $dataInput = ["active" => $active];
        $update = $this->model->update("jadwal_acara","id = '$id'",$dataInput);
        $fb = ["statusCode" => 200, "res" => "Data berhasil update", "data" => [$id,$active]];
        $this->fb($fb);
    }

    public function getTeamArisan()
    {
        $team = $this->input->post("team");
        $getData = $this->model->gd("arisan","*","id = '$team'","row");
        $fb = ["statusCode" => 200, "res" => $getData];
        $this->fb($fb);    
    }

    public function getAllTeamArisan()
    {
        $getData = $this->model->gd("arisan","*","id !=","result");
        $fb = ["statusCode" => 200, "res" => $getData];
        $this->fb($fb);    
    }

    public function updateScoreArisan()
    {
        $team = $this->input->post("team");
        $tipe = $this->input->post("tipe");
        $value = $this->input->post("value");
        $inputData = [$tipe => $value];
        
        $this->model->update("arisan","id = '$team'",$inputData);
        $fb = ["statusCode" => 200, "res" => "Data berhasil update"];
        $this->fb($fb);
    }

    public function resetArisan()
    {
        $inputData = ["contingen" => NULL, "score" => "0"];
        $this->model->update("arisan","id !=",$inputData);
        $fb = ["statusCode" => 200, "res" => "Data berhasil update"];
        $this->fb($fb);
    }
}
