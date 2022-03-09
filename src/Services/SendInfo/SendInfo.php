<?php
namespace Teamprodev\Eimzo\Services\SendInfo;

use Teamprodev\Eimzo\Services\SendInfo\SendInfoInterface;

class SendInfo {
    public function __construct(SendInfoInterface $sendProvider)
    {
        $sendProvider->sendMessage();
    }


}
