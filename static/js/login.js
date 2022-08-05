
$(() => {

    const url = 'http://192.168.219.140:8080';
    // const url = 'http://192.168.0.43:8080';


    $("#btn").click(
        function (event) {
            event.preventDefault();
            var data = {
                'userId': $("#userId").val(),
                'userPassword': $("#userPassword").val(),
            };
            const id = $("#userId").val();
            const pw = $("#userPassword").val();
            console.log("check input login data: ", data);

            var json = JSON.stringify(data);

            $.ajax({
                url: `${url}/login`,
                dataType: 'json',
                type: 'POST',
                data: json,
                Credentials: 'true',
                contentType: "application/json; charset=UTF-8",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log("response data check : ", data)
                    if (data == null) {
                        alert("로그인에 실패하셨습니다.");
                    } else {
                        console.log("data 확인하기: ", data.userId);
                        alert("환영합니다!");
                        location.href = 'TestExecutionList';
                    }
                },
                error: function(e){
                    console.log("err ; ", e);
                    alert("로그인에 실패했습니다. 다시 시도하세요.");
                    location.href = "login";
                }
            });

        });


        // execution 화면에 login 만들기
    // $('#btn').dxButton({
    //     text: 'login',
    //     onClick: function () {
    //         // event.preventDefault();
    //         var data = {
    //             'userId': $("#userId").val(),
    //             'userPassword': $("#userPassword").val(),
    //         };
    //         console.log("check input login data: ", data);

    //         var json = JSON.stringify(data);

    //         $.ajax({
    //             url: `${url}/login`,
    //             dataType: 'json',
    //             type: 'POST',
    //             data: json,
    //             Credentials: 'true',
    //             contentType: "application/json; charset=UTF-8",
    //             success: function (data) {
    //                 console.log("response data check : ", data)
    //                 if (data == null) {
    //                     alert("로그인에 실패하셨습니다.");
    //                 } else {
    //                     console.log("data 확인하기: ", data.userId);
    //                     alert("환영합니다!");
    //                     // sessionStorage.setItem("userId", data.userId); // 이걸 넣는다고 cors 해결되지 않음
    //                     location.replace( "TestExecutionList");
    //                 }
    //             }
    //         });
    //     }
    // });

    // function ajax_login(data) {
    //     // var logindata = data

    //     // 오브젝트 json 타입으로 변경
    //     var json = JSON.stringify(data);

    //     console.log(json);


    //     $.ajax({
    //         url: `${url}/loginForm`,
    //         dataType: 'json',
    //         type: 'POST',
    //         data: json,
    //         contentType: "application/json; charset=UTF-8",
    //         success: function (data) {
    //             console.log("data", data);
    //             if (data.userId == $("#id").val()) {
    //                 if (data.userPassword == $("#password").val()) {
    //                     alert("환영합니다!");
    //                     // $(location). attr('href',url)
    //                     // location.href="/execution/list.html"; 
    //                 }
    //                 else {
    //                     alert("비밀번호가 맞지 않습니다.");
    //                 }
    //             }
    //             else {
    //                 alert("아이디 혹은 비밀번호가 맞지 않습니다.");
    //             }
    //             location.href = "notice/List.jsp";
    //             console.log('endend');
    //         }
    //     });
    // };
}); 