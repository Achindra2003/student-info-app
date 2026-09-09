# Beyond the Brief: Self-Learning Initiatives

The base exercise (branching, PRs, one deliberate merge conflict, README) is
complete — see the main `README.md` and the branch/PR history on GitHub. This
document covers three additions the team lead made afterward, done solo so
Student 2 and Student 3 didn't need to take any further action. Each one
extends a learning objective the lab already named, rather than adding new
app features.

## 1. Branch protection on `main`

**Objective it extends:** *"Work collaboratively without overwriting another
developer's changes"* (objective 9) and the lab's repeated instruction to
"not directly modify main."

Throughout the exercise, that rule was enforced by convention — everyone
*agreed* to always branch and open a PR. GitHub can enforce it structurally
instead:

- **Require a pull request before merging** — direct pushes to `main`,
  including by the repo admin, are rejected. `git push origin main` now fails
  with a protected-branch error; the only way changes land is through a PR.
- **Require status checks to pass** (see the CI section below) — a PR can't
  be merged while the lint job is red.
- Required approving review count is set to **0** deliberately, so this
  doesn't require Student 2 or Student 3 to click anything going forward —
  the goal here was learning what branch protection *enforces mechanically*,
  not adding a review-approval step that needs other people's time.

Configured via `gh api repos/Achindra2003/student-info-app/branches/main/protection`
rather than a UI click-through, so the exact rule set is reviewable in this
repo's history (see the PR that introduced these files).

## 2. CI checks on every PR

**Objective it extends:** the course's DevOps framing — a PR review is a
manual gate; a CI pipeline is an automated one, and seeing both side by side
is the natural next step after Part 4 of the brief ("Student 1 reviews the
changes... approve and merge").

`.github/workflows/ci.yml` runs on every PR into `main` and on every push to
`main`, with three checks, each targeting one of the three files students
were assigned:

| Check | Tool | Targets |
|---|---|---|
| Validate HTML | `html-validate` (recommended ruleset) | `index.html` |
| Lint CSS | `stylelint` (core rules only, no external config package) | `style.css` |
| Check JS syntax | `node --check` | `script.js` |

Running `html-validate` against the existing `index.html` for the first time
surfaced 13 real issues — lowercase doctype, self-closing void elements,
inline `style=""` attributes instead of a class, a misused `aria-label` on
two elements, and a phone number that could line-wrap mid-digit. All of them
were fixed as part of adding this CI (see the same PR), not suppressed in
config — the point of adding a linter was to act on what it finds.

## 3. `CODEOWNERS`

**Objective it extends:** the team-roles structure the lab sets up in Part 0
(Student 1 = Lead, Student 2 = UI, Student 3 = JS).

`.github/CODEOWNERS` maps `style.css` to the UI developer, `script.js` to the
JS developer, and `index.html` to all three (since every role's branch
touched it at some point — UI card, contact block, Show Details button,
heading, title). This makes GitHub auto-suggest the right reviewer on a
future PR that touches a given file. It is **not** wired into branch
protection as a required check — adding it doesn't obligate Student 2 or
Student 3 to review anything; it's documentation of ownership that becomes
useful review-routing if the project continues.

## Why these three and not others

Two other candidates were considered and deliberately left out:

- **A second conflict resolved via `git merge` vs `git rebase`** — genuinely
  useful, but it requires a second live conflict scenario involving two
  branches, which pulls Student 2/3 back into the exercise. Skipped to keep
  this solo.
- **A release tag (`v1.0.0`) + changelog** — a legitimate adjacent Git skill,
  but it doesn't extend anything the lab's learning objectives actually ask
  for, so it would have been added just to add something.

The rule applied throughout: every addition should map to a specific
objective already named in the brief, or it doesn't go in.
