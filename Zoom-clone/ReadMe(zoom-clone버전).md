![image-20230131235233588](ReadMe(zoom-clone버전).assets/image-20230131235233588.png)

- 옵션관련 설명
  - 위에껀 디바이스ID 저걸 찾으려고 노력하지만 없으면 다른카메라대체
  - 아래껀 무적권 저것만 찾고 없으면 비디오x

![image-20230201000544914](ReadMe(zoom-clone버전).assets/image-20230201000544914.png)

- 이건 그동안 socket io 의 개념
  - 사람1 => 서버 => 사람2 이런식으로 전달이됨
  - 그러면 계속 오디오와 비디오등을 전달하면 서버터짐 
  - 그런데 webRTC는 peer to peer임
  - 바로 직접 컴퓨터, 브라우저에 전달하면 됨

![image-20230201000953060](ReadMe(zoom-clone버전).assets/image-20230201000953060.png)

![image-20230201001005517](ReadMe(zoom-clone버전).assets/image-20230201001005517.png)

![image-20230201001012012](ReadMe(zoom-clone버전).assets/image-20230201001012012.png)

![image-20230201001336550](ReadMe(zoom-clone버전).assets/image-20230201001336550.png)

***

![image-20230201003800498](ReadMe(zoom-clone버전).assets/image-20230201003800498.png)

![image-20230201003733142](ReadMe(zoom-clone버전).assets/image-20230201003733142.png)

- 이제 다른 누군가가 방에 들어왔을때 본격적으로 처리해야함

![image-20230201010710831](ReadMe(zoom-clone버전).assets/image-20230201010710831.png)

![image-20230201010750352](ReadMe(zoom-clone버전).assets/image-20230201010750352.png)

![image-20230201010812242](ReadMe(zoom-clone버전).assets/image-20230201010812242.png)

![image-20230201010822167](ReadMe(zoom-clone버전).assets/image-20230201010822167.png)

![image-20230201010843153](ReadMe(zoom-clone버전).assets/image-20230201010843153.png)

![image-20230201011009641](ReadMe(zoom-clone버전).assets/image-20230201011009641.png)

![image-20230201011320185](ReadMe(zoom-clone버전).assets/image-20230201011320185.png)

![image-20230201011513595](ReadMe(zoom-clone버전).assets/image-20230201011513595.png)

![image-20230201011748089](ReadMe(zoom-clone버전).assets/image-20230201011748089.png)

![image-20230201011819429](ReadMe(zoom-clone버전).assets/image-20230201011819429.png)

![image-20230201011825899](ReadMe(zoom-clone버전).assets/image-20230201011825899.png)

![image-20230201012020158](ReadMe(zoom-clone버전).assets/image-20230201012020158.png)

- 이제 offer를 다른사람들에게 보내줘야함

![image-20230201012338820](ReadMe(zoom-clone버전).assets/image-20230201012338820.png)

- 정리하자면 peer A 가 offer 생성해서 서버로 보내고 서버는 그걸 방의 다른사람들에게 다시 뿌려주고 그걸 프론트에서 offer이벤트로 다시 받아서 처리
- 이 다시 받은 offer 이벤트는 peer B나 C등인듯

![image-20230201012529175](ReadMe(zoom-clone버전).assets/image-20230201012529175.png)

![image-20230201012608770](ReadMe(zoom-clone버전).assets/image-20230201012608770.png)

![image-20230201012613075](ReadMe(zoom-clone버전).assets/image-20230201012613075.png)

![image-20230201012617355](ReadMe(zoom-clone버전).assets/image-20230201012617355.png)

![image-20230201012649101](ReadMe(zoom-clone버전).assets/image-20230201012649101.png)

***

![image-20230201012953027](ReadMe(zoom-clone버전).assets/image-20230201012953027.png)

- 이제 peerB가 받아서 처리해야함

![image-20230201013913379](ReadMe(zoom-clone버전).assets/image-20230201013913379.png)

- 코드 순서 바꿔줌
- 기존 startMedia를 initCall이름으로 바꾼뒤 이 함수를 더 빨리 실행시켜줌
- 코드 실행속도가 너무 빨라서 media나 연결을 만드는 속도보다 더빠르기 때문

![image-20230201014058612](ReadMe(zoom-clone버전).assets/image-20230201014058612.png)

- 그래서 이렇게 await initCall로 자막 함수들이 실행된뒤에 join-room 이벤트를 emit한다

![image-20230201014550865](ReadMe(zoom-clone버전).assets/image-20230201014550865.png)

- 이제 getUserMedia와 addStream은 아까 처리했고 이제 createAnswer만들어야함

![image-20230201015024424](ReadMe(zoom-clone버전).assets/image-20230201015024424.png)

![image-20230201015104695](ReadMe(zoom-clone버전).assets/image-20230201015104695.png)

![image-20230201015119437](ReadMe(zoom-clone버전).assets/image-20230201015119437.png)

![image-20230201015328518](ReadMe(zoom-clone버전).assets/image-20230201015328518.png)

- 와우 엄청난 핑퐁이었음

![image-20230201015419416](ReadMe(zoom-clone버전).assets/image-20230201015419416.png)

- 이건 addStream() 대신 쓰는거라고 설명해주는 짤

![image-20230201015907045](ReadMe(zoom-clone버전).assets/image-20230201015907045.png)

![image-20230201015914940](ReadMe(zoom-clone버전).assets/image-20230201015914940.png)

![image-20230201015940883](ReadMe(zoom-clone버전).assets/image-20230201015940883.png)

![image-20230201015951791](ReadMe(zoom-clone버전).assets/image-20230201015951791.png)

![image-20230201020546974](ReadMe(zoom-clone버전).assets/image-20230201020546974.png)

![image-20230201020554700](ReadMe(zoom-clone버전).assets/image-20230201020554700.png)

![image-20230201020602628](ReadMe(zoom-clone버전).assets/image-20230201020602628.png)

![image-20230201020700294](ReadMe(zoom-clone버전).assets/image-20230201020700294.png)

![image-20230201020705149](ReadMe(zoom-clone버전).assets/image-20230201020705149.png)

![image-20230201020930550](ReadMe(zoom-clone버전).assets/image-20230201020930550.png)

![image-20230201021122362](ReadMe(zoom-clone버전).assets/image-20230201021122362.png)

![image-20230201021151325](ReadMe(zoom-clone버전).assets/image-20230201021151325.png)

![image-20230201021233735](ReadMe(zoom-clone버전).assets/image-20230201021233735.png)

![image-20230201021609791](ReadMe(zoom-clone버전).assets/image-20230201021609791.png)

![image-20230201021833088](ReadMe(zoom-clone버전).assets/image-20230201021833088.png)

![image-20230201021842190](ReadMe(zoom-clone버전).assets/image-20230201021842190.png)

![image-20230201021849663](ReadMe(zoom-clone버전).assets/image-20230201021849663.png)

![image-20230201021859412](ReadMe(zoom-clone버전).assets/image-20230201021859412.png)

![image-20230201022033912](ReadMe(zoom-clone버전).assets/image-20230201022033912.png)

***

![image-20230201023856629](ReadMe(zoom-clone버전).assets/image-20230201023856629.png)

- 카메라 옵션의 변경시 카메라 변경 다른쪽에도 업데이트

![image-20230201023922292](ReadMe(zoom-clone버전).assets/image-20230201023922292.png)

![image-20230201023929597](ReadMe(zoom-clone버전).assets/image-20230201023929597.png)

![image-20230201024113612](ReadMe(zoom-clone버전).assets/image-20230201024113612.png)

![image-20230201024123014](ReadMe(zoom-clone버전).assets/image-20230201024123014.png)

- 각각 오디오와 비디오를 보내는 Sender가 2개있음

![image-20230201024230775](ReadMe(zoom-clone버전).assets/image-20230201024230775.png)

![image-20230201024305818](ReadMe(zoom-clone버전).assets/image-20230201024305818.png)

![image-20230201024535575](ReadMe(zoom-clone버전).assets/image-20230201024535575.png)

![image-20230201024541459](ReadMe(zoom-clone버전).assets/image-20230201024541459.png)

![image-20230201024621927](ReadMe(zoom-clone버전).assets/image-20230201024621927.png)

![image-20230201024629132](ReadMe(zoom-clone버전).assets/image-20230201024629132.png)

![image-20230201024635960](ReadMe(zoom-clone버전).assets/image-20230201024635960.png)

![image-20230201024851012](ReadMe(zoom-clone버전).assets/image-20230201024851012.png)

- 폰으로 접속하기 위한 설치

![image-20230201024905177](ReadMe(zoom-clone버전).assets/image-20230201024905177.png)

![image-20230201024932757](ReadMe(zoom-clone버전).assets/image-20230201024932757.png)

![image-20230201024940447](ReadMe(zoom-clone버전).assets/image-20230201024940447.png)

![image-20230201024945721](ReadMe(zoom-clone버전).assets/image-20230201024945721.png)

![image-20230201025002695](ReadMe(zoom-clone버전).assets/image-20230201025002695.png)

![image-20230201025036042](ReadMe(zoom-clone버전).assets/image-20230201025036042.png)

![image-20230201025747271](ReadMe(zoom-clone버전).assets/image-20230201025747271.png)

- lt --port 3000 으로 실행하면 주소나오는데 터미널 분리로 서버도 열어줘야한다

***

stun 서버

![image-20230201030242221](ReadMe(zoom-clone버전).assets/image-20230201030242221.png)

![image-20230201030301356](ReadMe(zoom-clone버전).assets/image-20230201030301356.png)

![image-20230201030312224](ReadMe(zoom-clone버전).assets/image-20230201030312224.png)

- 하지만 우선은 무료로

![image-20230201030339257](ReadMe(zoom-clone버전).assets/image-20230201030339257.png)

![image-20230201030356927](ReadMe(zoom-clone버전).assets/image-20230201030356927.png)

![image-20230201030905391](ReadMe(zoom-clone버전).assets/image-20230201030905391.png)

- 비디오를 주고받기 위해서가 아닌 공용주소를 알아내기위해 사용중이다

![image-20230201031015003](ReadMe(zoom-clone버전).assets/image-20230201031015003.png)

![image-20230201031205349](ReadMe(zoom-clone버전).assets/image-20230201031205349.png)

![image-20230201031217138](ReadMe(zoom-clone버전).assets/image-20230201031217138.png)

![image-20230201031231587](ReadMe(zoom-clone버전).assets/image-20230201031231587.png)

![image-20230201031241696](ReadMe(zoom-clone버전).assets/image-20230201031241696.png)

![image-20230201031251959](ReadMe(zoom-clone버전).assets/image-20230201031251959.png)

![image-20230201031314256](ReadMe(zoom-clone버전).assets/image-20230201031314256.png)

![image-20230201031323908](ReadMe(zoom-clone버전).assets/image-20230201031323908.png)

***



![image-20230201031622222](ReadMe(zoom-clone버전).assets/image-20230201031622222.png)

![image-20230201031639813](ReadMe(zoom-clone버전).assets/image-20230201031639813.png)

![image-20230201031646379](ReadMe(zoom-clone버전).assets/image-20230201031646379.png)

![image-20230201031652251](ReadMe(zoom-clone버전).assets/image-20230201031652251.png)

![image-20230201032005132](ReadMe(zoom-clone버전).assets/image-20230201032005132.png)

![image-20230201032012140](ReadMe(zoom-clone버전).assets/image-20230201032012140.png)

![image-20230201032017923](ReadMe(zoom-clone버전).assets/image-20230201032017923.png)

![image-20230201032023404](ReadMe(zoom-clone버전).assets/image-20230201032023404.png)

![image-20230201032029603](ReadMe(zoom-clone버전).assets/image-20230201032029603.png)