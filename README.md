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
