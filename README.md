## ESLint Testing Plugins 설치

eslint에서 기본적으로 제공하지 않는 다양한 규칙을 플러그인을 통해 관리할 수 있습니다.
예를 들어서 react에 관련된 린트 설정을 위해서는

- eslint-plugin-react
  를 사용하면 되며, react hooks에 관련된 규칙을 적용시켜주려면
- eslint-plugin-hooks
  를 사용하면 됩니다.

설치해야할 플러그인

```
yarn add -D eslint-plugin-testing-library eslint-plugin-jest-dom
```

testing-library: render로 DOM을 그리는 부분
jest-dom: expect-matcher로 테스트

설치를 했다면, 내부 설정

```
{
  "plugins": ["testing-library", "jest-dom"], // 넣어주고
  "extends": [ // 사용하는 부분
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
} // 규칙을 변경하고자 한다면 rules를 통해 가능
```

그런데 올바른 매쳐 적용은 안됨.. ? 내가 맘대로 조작해서 그런듯 함

## TDD

테스트 주도 개발
테스트코드 작성 후 실제 코드 작성

### 좋은 점

1. TDD를 하므로 인해 많은 기능을 테스트하기에 소스코드 안정감이 부여된다.
2. 실제 개발하면서 많은 시간이 소요되는 부분은 디버깅 부분이기에 TDD를 사용하면 디버깅 시간이 줄어들고 실제 개발 시간도 줄어듭니다.
3. 소스 코드 하나하나를 더욱 신중하게 짤 수 있기 때문에 깨끗한 코드가 나올 확률이 높아집니다.

## FireEvent API

유저가 발생시키는 액션(이벤트)에 대한 테스트를 해야하는 경우 사용
https://testing-library.com/docs/dom-testing-library/api-events/

---

# Query 사용 우선 순위

https://testing-library.com/docs/queries/about/#priority

너의 테스트가 닮아야한다. 유저가 컴포넌트가 상호작영하는지

1. 모든 사람이 접근 가능한 쿼리를 사용해야한다.

- 쿼리인데, 시각적으로나 마우스를 ㅏㅅ용하느느 경험하는 사람 뿐만 아니라, 보조기구를 사용하는 사람들에 경험도 반영
- getByRole (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
- 롤과 name속성값을 통해 얻어온다.

2. getByLabelText

3. ...

우리는 getByRole만 사용할 것

---

## FireEvent, UserEvent

UserEvent 사용이 더 좋다 왜?

- FireEvent를 개선해서 만든 것
- 내부코드를 보면, fireEvent를 사용하면서 내부 엘러먼트 타입에 따라 더욱 적절한 반응을 보여준다.
- 게다가 userEvent를 사용하면, 버튼을 눌렀을 떄 focus되는 반응처럼 더 사용자와 적합한 경험을 테스트할 수 있게 합니다.

---

# Mock Service Worker

백엔드에서 데이터를 가져와야할 경우 테스트를 어떻게 할까?

- 백엔드에서 데이터를 가져오는 부분을 테스트하기 위해서는 실제로 서버에 호출하는 end-to-end 테스트를 할 수 있지만
- 여기서는 서버에 요청을 보낼 떄 그 요청을 가로채서 Moick Service Worker라는 것으로 요청을 처리하고
- 모의 응답(mocked response)를 보내주겠습니다.

## MSW의 작동 방식

- 브라우저에 서비스 워크를 등록하여 외부로 나가는 네트워크 리퀘스트를 감지합니다.
- 그리고 그 요청을 실제 서버로 갈 떄 중간에 가로채서, MSW 클라이언트사이드 라이브러리로 보냅니다.
- 그 후 등록된 핸들러에서 요청을 처리한 후 모의 응답을 브라우저로 보냅니다.

## 2가지 작동 방식

1. 브라우저에 통합 설치하여 작동
2. Node와 통합하여 사용 (Jest를 사용하려면 이 방법을 사용해야 함)

### beforeAll

- 모든 테스트 전에 이 서버를 listen 하는것
- render와 비슷한 역할

### afterEach

- 하나하나 테스트 이후에 핸들러를 리셋 시켜주는 것

### afterAll

- 테스트가 끝나면 서버를 닫는 것

# lint가 잘 안먹히는 오류 있는듯

await, async나 더 정확한 matcher를 추천해주지 않음

## userEvent.clear()

input 이나 textarea에 텍스트를 선택(select)한 후 제거(delete)해 줍니다.

이 부분은 현재는 없어도 테스트 결과에 영항을 미치지는 않습니다.
하지만 만약 현재 소스 코드 보다 위에서 같은 엘리먼트를 위한
userEvent를 사용했다면, clear 해준 후에
userEvent.type()을 사용하는게 좋습니다.

## Custom Render

wrapper 를 모든 test마다 넣우는것을 불필요한 복제이기 때문에,
이런 방법을 사용할 수 있다.
