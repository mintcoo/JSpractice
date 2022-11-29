document.addEventListener('DOMContentLoaded',()=>{

  const canvasElement = document.querySelector('canvas');

  // 캔버스위에 뭔가 그리기전 밑작업.

  // 1. Context 2D를 얻는다. => 이게 스케치북 얻는 느낌
  const context = canvasElement.getContext("2d");

  // 2. 여기부터 스케치북위에 뭘그리든뭐든 하는 코드짜면 됨.
  // 3. 뭐그릴지 어떻게그릴지.. 이거 방법만찾으면 거기에 게임만 붙이면 됨.
  
  // 이거는 Rect로 fill(채운다) 채우는 기능
  // 파라미터 (x축,y축,가로길이,세로길이)
  

  //setTimeout() 몇초뒤 실행
  //setInterval 몇초간격으로 실행(무한) 끄려면 clearInterval이라는걸 써야함

  const getImage = function(){
    return new Promise((resolve,reject)=>{
      const img = new Image(); //이미지 객체 생성
      //img.src = "data:image/jpeg;base64,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" ; //code.jpg라는 이미지 파일을 로딩 시작
      img.src = "./01.png";
      img.onload = function (){
        //로그가 다되면 불리는곳;
        resolve(img);
      }
    });
  }
  
  getImage()
  .then(result=>{
    console.log(result);
    playGame(result);
  })
  .catch(err=>{
    console.log(err);
  })

  const canvasRect = {width:800,height:800};
  let defaultXPosition = 0;
  const player = Player();

  function playGame(image){
    setInterval(()=>{

      // 백지 초기화
      // x10,y0부터 그리고, width,height 지우기
      context.clearRect(0,0,800,800);
      context.drawImage(image,0,0);
  
      // 그리는 영역 로직
      
  
      //450도 아까는 너가 그냥 뇌로 계산해서
      const destinationPositionX = 200;
      if ( player.x >= destinationPositionX - player.width ){
        player.x = destinationPositionX - player.width;
        onCollision(player);
      }else{
        player.x += player.speed;
      }
      
  
      if(player.isDead == false){
        context.fillRect(player.x,player.y,player.width,player.height);
      }
    
      context.fillRect(destinationPositionX,0,50,50);
  
  
    },1000/60);
  
  }

});

function onCollision(player){
  player.isDead = true;
}

function Player(){
  let x = 0;
  let y = 0;
  let speed = 1;
  let isDead = false;
  return {
    width:50,height:50,x,y,speed,isDead
  };
}
