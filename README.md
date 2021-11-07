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
