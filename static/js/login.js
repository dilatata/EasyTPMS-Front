
$(() => {

    const url = 'http://192.168.219.103:8080';

    $("#btn").click(
        function(event){
            event.preventDefault();
            var data = { 
                'userId' : $("#userId").val(),
                'userPassword' : $("#userPassword").val(),       
            };
            console.log(data);

            var json = JSON.stringify(data);

            $.ajax({
                url: `${url}/loginForm`,
                dataType: 'json',
                type: 'POST',
                data: json,
                contentType: "application/json; charset=UTF-8",
                success: function(data) {
                    if(data == null) {
                        alert("존재하지 않는 아이디입니다.");
                    }
                    console.log("data",data);
                    if(data.userId == $("#userId").val()) {
                        if(data.userPassword == $("#userPassword").val()) {
                            alert("환영합니다!");
                            location.href="TestExecutionList.html"; 
                        }
                        else {
                            alert("비밀번호가 맞지 않습니다.");
                        }
                    }
                    else {
                        alert("아이디 혹은 비밀번호가 맞지 않습니다.");
                    }

                      console.log('endend');
                    },
                
                });
        });

    function ajax_login(data){
        // var logindata = data
    
        // 오브젝트 json 타입으로 변경
        var json = JSON.stringify(data);
    
        console.log(json);
    
    
        $.ajax({
            url: `${url}/loginForm`,
            dataType: 'json',
            type: 'POST',
            data: json,
            contentType: "application/json; charset=UTF-8",
            success: function(data) {
                console.log("data",data);
                if(data.userId == $("#id").val()) {
                            if(data.userPassword == $("#password").val()) {
                                alert("환영합니다!");
                                // location.href="notice/List.jsp"; 
                            }
                            else {
                                alert("비밀번호가 맞지 않습니다.");
                            }
                        }
                        else {
                            alert("아이디 혹은 비밀번호가 맞지 않습니다.");
                        }
                    location.href="notice/List.jsp";
                  console.log('endend');
                }
            });
        }
}); 
    
//  $("#btn").click(function(){

//     console.log($("#userId").val());

//     var data = { 
//         'userId' : $("#userId").val(),
//         'userPassword' : $("#userPassword").val(),       
//     };

//     // 오브젝트 json 타입으로 변경
//     var json = JSON.stringify(data);

//     console.log(json);


//     $.ajax({
//         url: `${url}/loginForm`,
//         dataType: 'json',
//         type: 'POST',
//         data: json,
//         contentType: "application/json; charset=UTF-8",
//         success: function(json) {
//             console.log('ghkrdls');
//             if (json) {
//               console.log('endend');
//             }
//         }
//       }); 
 
//     if(id == $("#id").val()) {
//         if(password == $("#password").val()) {
//             alert("환영합니다!");
//             return 'TestExecutionList.html'; 
//         }
//         else {
//             alert("비밀번호가 맞지 않습니다.");
//         }
//     }
//     else {
//         alert("아이디 혹은 비밀번호가 맞지 않습니다.");
//     }

//     });

// });
