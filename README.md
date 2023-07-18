# @patrickxu/use-loading 

@patrickxu/use-loading is a custom React hook effortlessly manages the loading state of asynchronous functions.

## Installation

To install @patrickxu/use-loading, simply run:

    npm install @patrickxu/use-loading

or

    yarn add @patrickxu/use-loading

## Usage

To use, simply import useLoading from @patrickxu/use-loading:

```jsx
import useLoading from '@patrickxu/use-loading';

const sleep = (millisecond = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, millisecond);
  });
}

const App = () => {
  const { groupHandler, isLoading } = useLoading();

  const asyncFunction = groupHandler(async () => {
    await sleep();
  }, "key 1");

  return (
    <>
      <button onClick={asyncFunction1}>
        sleep for 500ms ("key 1")
      </button>
      <span>
        {`isLoading: ${isLoading}`}
      </span>
    </>);
};
```
For a more detailed example, please refer to the CodeSandbox [demo](https://codesandbox.io/s/lingering-feather-93kw25).


## Documentation

### ActionType

```tsx
type ActionType = (...params: any[]) => Promise<any>;
```


### UseLoadingReturnType
```tsx
interface UseLoadingReturnType {
    // state indicating whether async function is running
    isLoading: boolean;
    // state indicating whether async function throws an error
    isError: boolean;
    // the handler returned if you pass an async function as input
    handleAction: ActionType;
    // the handler for multiple async function share the same loading state
    groupHandler: (fun: ActionType, key?: string) => ActionType;
    // the keys of async function that are running
    keys: string[];
}
```

## Contributing
If you'd like to contribute to @patrickxu/use-loading, feel free to submit a pull request or open an issue on GitHub. We welcome all contributions and feedback!
