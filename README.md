# react-tabs

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/brunoscopelliti/react-tabs/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@bscop/react-tabs.svg?style=flat)](https://www.npmjs.com/package/@bscop/react-tabs)
[![CircleCI Status](https://circleci.com/gh/brunoscopelliti/react-tabs.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/brunoscopelliti/react-tabs)
[![Coverage](https://img.shields.io/codecov/c/github/brunoscopelliti/react-tabs)](https://app.codecov.io/gh/brunoscopelliti/react-tabs/)

Accessible tabs (in React).

[Demo in Storybook](https://brunoscopelliti.github.io/react-tabs)

## Install

```
npm i @bscop/react-tabs
```

## Usage

```js
import Tabs from "@bscop/react-tabs";

function App () {
  return (
    <Tabs 
      tabs={[
        {
          id: "tab-1",
          label: "Section one",
          renderContent () {
            return (
              <p>Content of the first tab ...</p>
            );
          },
        },
        {
          id: "tab-2",
          label: "Section two",
          renderContent () {
            return (
              <p>Content of the second tab ...</p>
            );
          },
        }
      ]}
      title="Switch tab"
    />
  );
}
```

## Contribute

Read the [guidelines](./CONTRIBUTING.md).

### Run tests

```
npm test
```

### Coverage

Coverage reports are hosted on [codecov](https://codecov.io/).

```
npm run badge:coverage -- --token=<guid>
```

---

Bruno Scopelliti\
www.brunoscopelliti.com
