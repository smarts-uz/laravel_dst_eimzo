<?php

namespace Teamprodev\Eimzo\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pkcs7' => 'required',
            'data' => 'nullable',
            'comment' => 'nullable',
            'status' => 'required',
            'user_id' => 'nullable',
            'application_id' => 'required',
        ];
    }
}
