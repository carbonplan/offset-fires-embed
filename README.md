# offset-fires

visualizing and analyzing fires in forest offset projects

# testing

## git-lfs

We use [Git Large File Storage](https://github.com/git-lfs/git-lfs) to manage image snapshots for visual regression testing. You will need to [install `git-lfs`](https://git-lfs.github.com) in order to run our snapshot tests.

## running tests

```bash
npm run test
```

## updating snapshots

```bash
npm run test -- -u
```
