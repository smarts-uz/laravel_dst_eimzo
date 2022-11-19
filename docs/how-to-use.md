## How to use

1. You should write `<form>`.For example:


        <form name="testform" action="{{route('eimzo.sign.verify')}}" method="POST">
                @csrf
                <label id="message"></label>
                <div class="form-group">
                    <label for="select1">
                        {{ __('Выберите ключ') }}
                    </label>
                    <select name="key" id="select1" onchange="cbChanged(this)"></select> <br/>
                </div>
                <div class="form-group hidden">
                    <label for="exampleFormControlTextarea1">
                        {{ __('Подпись текста') }}
                    </label>
                    <textarea class="form-control" id="eri_data" name="data" rows="3"></textarea>
                </div>
                <div class="mb-2 text-center mr-6">
                    {{ __('Идентификатор ключа') }} <label id="keyId"></label><br/>

                    <button onclick="generatekey()" class="hidden btn btn-success"
                            type="button">{{ __('Подпись') }}</button>
                    <br/>
                </div>
                <div class="w-1/2">
                    <input name="comment">
                </div>
                <div class="form-group hidden">
                    <label for="exampleFormControlTextarea3">
                        Подписанный документ PKCS#7
                    </label>
                    <textarea class="form-control" readonly required
                              name="pkcs7" id="exampleFormControlTextarea3"
                              rows="3"></textarea>
                </div>
                <br/>
                <input id="status" name="status" class="hidden" type="text">
                <input value="applications" id="table_name" name="table_name" class="hidden" type="text">
                <input value="{{$application->id}}" id="application_id" name="application_id" class="hidden"
                       type="text">
                <div class="row ml-4 pb-4">
                    <button name="status" value="1" type="submit" class="btn btn-success col-md-2">
                        {{ __('Принять') }}
                    </button>
                    <button name="status" value="0" type="submit" class="btn btn-danger col-md-2 mx-2   ">
                        {{ __('Отказ') }}
                    </button>
                </div>
            </form>