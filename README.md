# splendor 보드게임을 구현했습니다

css, 알고리즘을 연습하기 위한 스몰 프로젝트로서, React와 styeld component 만을 사용해 만든 간단한 보드게임입니다.

## 명령어

다음과 같은 명령어를 사용하실 수 있습니다.

### `npm start`

실행을 위한 명령어 입니다.


## 기본 컨셉 
![스크린샷 2023-06-14 오후 6 13 03](https://github.com/kaisiok/splendorpractice/assets/95914687/80e2b13c-9f5a-4330-a44c-80373baf2838)


토큰을 모아 카드(그림)을 구매합니다. 

한번 그림을 구매하면 다른 그림을 구매할 때 할인 혜택을 받을 수 있습니다.

특정 그림들을 모으면 귀족들이 방문합니다.

그림과 귀족들을 모아 가장 높은 명성을 얻는 사람이 승리합니다.

## 게임 진행

플레이어는 자기 차례에 다음 3가지 행동중 하나를 할 수 있습니다.

1.카드 구매하기

2.토큰 가져오기

3.손에 카드 선점하기

## 카드 구매하기

![buyCard](https://github.com/kaisiok/splendorpractice/assets/95914687/6892e6dd-ad75-4901-b289-074b4f05dd26)


카드의 아래쪽엔 그 카드를 사기 위한 비용이 표시되어 있습니다.

비용만큼의 토큰을 지불하고 카드를 구매합니다.

카드의 왼쪽 위에는 그 카드가 제공하는 점수가 표시되어 있습니다.

카드의 테두리와 오른쪽 위에는 그 카드의 타입이 표시되어 있습니다.

내가 만약 검은색 타입의 카드를 구매했다면, 다음부터 카드를 구입할 때, 내가 가진 검은색 타입의 카드만큼 검은색 토큰을 덜 지불해도 카드를 구매할 수 있습니다.

## 토큰 가져오기

![getTokenGif](https://github.com/kaisiok/splendorpractice/assets/95914687/2b7de0c0-35fd-4846-977b-05483baa39ee)


토큰 영역을 클릭해 가져올 토큰을 선택합니다.

토큰은 서로 색이 다른 토큰을 각각1개씩 총3개, 또는 서로 색이 같은 토큰을 2개까지 가져올 수 있습니다.

단, 특정 토큰이 3장 이하라면, 그 토큰을 2개 가져갈 수 없습니다.

소유할 수 있는 토큰의 최대 갯수는 10개입니다.

## 카드 손에 선점하기

![getCard](https://github.com/kaisiok/splendorpractice/assets/95914687/5682900c-a88d-4c00-a670-d309a099ebee)


카드의 비용을 지불하지 않고, 손으로 가져올 수 있습니다.(아직 구매한것이 아니므로 점수가 되지 않습니다)

이 때 테이블에 노란색 코인이 남아있다면, 노란색 코인 1개도 같이 가져옵니다.

노란색 코인은 카드를 구매할 때 원하는 색 코인으로 대체해서 사용이 가능한 코인입니다.

최대 3장까지 카드를 선점할 수 있습니다.

손으로 가져온 카드는 내 차례에 비용과 행동 한번을 똑같이 지불하고 구매할 수 있습니다.

공개된 카드 외에도, 원한다면 덱 맨 위 카드를 손으로 가져올 수 있습니다.

## 추가 규칙

![getTile](https://github.com/kaisiok/splendorpractice/assets/95914687/9fe85854-20fb-44ee-9217-aeeb3f09a40e)


플레이어는 자기 차례에 단 한번씩만 행동 할 수 있습니다.

행동을 한 후 Next버튼을 누르면 다음 플레이어에게 차례가 넘어갑니다.

귀족 타일의 하단에는 그 귀족이 선호하는 카드의 타입과 숫자가 적혀 있습니다.

조건을 가장 빠르게 달성한 사람은 귀족 타일을 가져갈 수 있습니다.

모든 귀족타일은 3점의 가치를 가지고 있습니다.

## 게임 종료

![showWinner](https://github.com/kaisiok/splendorpractice/assets/95914687/1ebdf7b9-1187-4894-90d4-436fe4881b6c)


어떤 플레이어라도 15점 이상을 달성한 플레이어가 나왔다면, 그 라운드의 4번플레이어까지 차례가 진행된 후 게임이 종료됩니다.

게임이 종료된 후 가장 많은 점수를 획득한 플레이어가 승리합니다.

## 개발자 모드

기본적으로 Next 버튼은 행동을 하기 전까진 비활성화 상태입니다.

그러나 개발자 모드를 on으로 설정하면 아무런 행동을 하지 않아도 턴을 넘길 수 있습니다.

