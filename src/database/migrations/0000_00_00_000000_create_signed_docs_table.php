<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignedDocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signed_docs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('status')->nullable();
            $table->integer('role_id');
            $table->integer('user_id');
            $table->text('pkcs');
            $table->text('text');
            $table->text('comment');
            $table->text('data');
            $table->timestamp();
            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('signed_docs');
    }
}
