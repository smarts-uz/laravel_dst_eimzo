<?php

namespace Teamprodev\Eimzo\Http\Controllers;

use Teamprodev\Eimzo\Requests\EriRequest;
use Teamprodev\Eimzo\Services\AuthLogService;
use Teamprodev\Eimzo\Services\EriService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EimzoController extends Controller
{
    public function index(){
        return view("Teamprodev.eimzo.login");
    }

    public function auth(EriRequest $request) {
        try {
            $oneAuthService = new EriService();
            $params = $oneAuthService->makeParams($request->validated());
            $oneAuthService->authorizeUser($params);

            AuthLogService::logAuth();

        } catch (\Throwable $th) {
            $errorMessage = "Киришда хатолик юз берди, илтимос кейинроқ уруниб кўринг.";
            if(in_array($th->getCode(), [401])) {
                $errorMessage = $th->getMessage();
            }

            Log::error(sprintf("ERI error: Message: %s, Line: %s, File: %s", $th->getMessage(), $th->getLine(), $th->getFile()));
            return redirect()->route('eimzo.auth.back')->with('error', $errorMessage);
        }

        return redirect()->route('eimzo.auth.back')->with('success', 'You are logged in!');
    }
}
