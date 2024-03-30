# testing-utils

This library was generated with [Nx](https://nx.dev).

## Usage

This testing utility file is intended to container jest helper utility files.

To get it working with a repo first add the index to the jest config under `setupFilesAfterEnv`:

``` (ts)
{
    setupFilesAfterEnv: ['../../utils/testing-utils/src/index.ts'],
}
```

Then add to the `tsconfig.spec.json` file:

``` (json)
{
    "files": ["../../utils/testing-utils/src/globals.d.ts"]
}
```
