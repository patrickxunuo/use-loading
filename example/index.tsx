import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useLoading from '../src';

export const sleep = (millisecond = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, millisecond);
    });
}

const App = () => {
  const { groupHandler, isLoading, keys } = useLoading();

  const asyncFunction1 = groupHandler(async () => {
      await sleep();
  }, "func 1");

  const asyncFunction2 = groupHandler(async () => {
      await sleep(1000);
  }, "func 2");

  return (
    <div>
        <button onClick={asyncFunction1}>
            sleep for 500ms
        </button>
        <button onClick={asyncFunction2}>
            sleep for 1000ms
        </button>
        {isLoading ? "is loading" : "not loading"}
        {`keys: ${JSON.stringify(keys)}`}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
