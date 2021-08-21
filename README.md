# `library`

mono repository library for SeoHwan Cho's projects.

# Library List

## Configs

- `@choseohwan/babel-preset-base` **[README](./packages/babel-preset-base/README.md)**
   - babel base preset for SeoHwan Cho's project


- `@choseohwan/eslint-config-base` **[README](./packages/eslint-config-base/README.md)**
  - eslint base config for SeoHwan Cho's project


- `@choseohwan/eslint-config-react` **[README](./packages/eslint-config-react/README.md)**
  - eslint react config for SeoHwan Cho's project


- `@choseohwan/jest-config-base` **[README](./packages/jest-config-base/README.md)**
  - jest base config for SeoHwan Cho's project


- `@choseohwan/prettier-config-base` **[README](./packages/prettier-config-base/README.md)**
  - base prettier config for SeoHwan Cho's project


- `@choseohwan/tsconfig-base` **[README](./packages/tsconfig-base/README.md)**
  - tsconfig base config for SeoHwan Cho's project
  

- `@choseohwan/rollup-builder` **[README](./packages/rollup-builder/README.md)**
  - rollup builder for rollup config easier
  

- `@choseohwan/rollup-plugin-builder-base` **[README](./packages/rollup-plugin-builder-base/README.md)**
  - Base plugins builder about @choseohwan/rollup-builder


## Utilities

- `@choseohwan/utils` **[README](./packages/utils/README.md)**
  - javascript/typescript utility functions for @choseohwan project

# Workflow

- \* : CI/CD Action
- *TEXT* : Owner or member
- TEXT : Worker
- \[optional\] : Optional workflow

<br>

1. Make branch from main.


2. Working on the branch created in step 1.


3. Create pull request to the `main` branch.
   1. \* Automatically execute test and buildable test when create pull request.
   2. \* Check mergeable branch. (The current procedure will **unconditionally fail**.)


4. \[optional\] *Make canary version.*
   1. *Leave a comment on the pull request with `/canary-publish`.*
   2. \* Start automatically creating canary version with comment.


5. \[optional\] *Remove canary version. (manually)*
   1. *Leave a comment on the pull request with `/canary-remove`.*
   2. \* Start automatically removing canary version with comment.


6. *If all verifications have been completed for the job, <br>
   proceed according to the procedure below.*
   - *If the work has no problem and you want to deploy, follow the procedure in #7.*
   - *If you want reject this pull request, close pull request.*
     - \* Remove and unpublish canary version.


7. *Change the base branch of the pull request to the `release` branch.*
   - *If there is no release branch, please create a new one.*


8. *Merge pull request to the `release` branch.*
   1. \* Remove and unpublish canary version when merge complete. 
   2. \* Create prerelease versioning commit and publish prerelease version.


9. *When all working versions have been merged into `release` version,<br> 
   create a pull request to `main`.*


10. *If `release` branch has no problem and you want release all work, <br>
    merge pull request to `main`.*
    1. \* Remove and unpublish prerelease version.
    2. \* Create release versioning commit and **publish release version**.


11. Remove `release` branch after merge to `main` branch.
