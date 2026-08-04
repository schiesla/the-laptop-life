# Release Process: develop → main

How a batch of `develop` work becomes a versioned, tagged `main` release with GitHub Release notes.

## Versioning

Semantic versioning (`vMAJOR.MINOR.PATCH`), starting at `v0.1.0`. The site is still pre-launch (behind `VITE_UNDER_CONSTRUCTION`), so it stays on `0.x` until it's actually live for real users — at that point the first `main` release becomes `v1.0.0`.

- **Patch** (`v0.1.1`): content additions, copy/wording fixes, bug fixes
- **Minor** (`v0.2.0`): new features (new page, new pipeline, new site capability)
- **Major** (`v1.0.0`+): breaking changes, or the pre-launch → launch milestone

## Step-by-step

### 1. Make sure `develop` is in the state you want to ship
No uncommitted changes, everything pushed:
```bash
git status --porcelain
git push
```

### 2. Bump the version
Edit `package.json`'s `"version"` field to the new version number (no `v` prefix in the file itself). Commit and push directly to `develop`:
```bash
git add package.json
git commit -m "Bump version to X.Y.Z for release"
git push
```

### 3. Open the PR
```bash
gh pr create --base main --head develop \
  --title "vX.Y.Z: <short summary>" \
  --body "$(cat <<'EOF'
**Version:** vX.Y.Z

## Summary
- ...

## Why
...

## Notes for reviewer
...
EOF
)"
```
- Title format is always `vX.Y.Z: <summary>` — this is what makes the PR list itself read as a release history.
- Body always starts with a `**Version:** vX.Y.Z` line.
- If `develop` has drifted from `main` across multiple earlier sessions (not just the current one), the Summary should cover everything in the diff, not just the most recent work — check with `git log main..develop --oneline` and `git diff main..develop --stat`.

### 4. Review and merge
This user reviews before merging — wait for confirmation the PR is actually merged before continuing. Don't assume; ask or check:
```bash
gh pr view <number> --json state -q .state
```

### 5. Tag the merge commit
Once merged, fetch and confirm the tag will point at the actual merge commit on `main`:
```bash
git fetch origin
git log origin/main --oneline -3
```
Then tag it:
```bash
git tag vX.Y.Z <merge-commit-sha>   # or just `git tag vX.Y.Z` if origin/main is checked out locally
git push origin vX.Y.Z
```
Verify:
```bash
git rev-list -n 1 vX.Y.Z            # should match the merge commit
git ls-remote --tags origin | grep vX.Y.Z
```

### 6. Create the GitHub Release
Pull the PR body as a starting point for release notes — trim anything PR-review-specific (e.g. "Notes for reviewer" → "Notes", drop review-process comments) since this is now a public changelog entry, not a review artifact:
```bash
gh pr view <number> --json body -q .body > /tmp/release_notes.md
# edit /tmp/release_notes.md as needed
gh release create vX.Y.Z --title "vX.Y.Z" --notes-file /tmp/release_notes.md --target main
```

### 7. Confirm
```bash
gh release view vX.Y.Z
```
Report the release URL back.

## Quick reference

| Step | Command |
|---|---|
| Bump version | edit `package.json`, commit, push to `develop` |
| Open release PR | `gh pr create --base main --head develop --title "vX.Y.Z: ..." --body "..."` |
| Check PR merged | `gh pr view <number> --json state -q .state` |
| Tag the merge commit | `git tag vX.Y.Z && git push origin vX.Y.Z` |
| Verify tag placement | `git rev-list -n 1 vX.Y.Z` |
| Create GitHub Release | `gh release create vX.Y.Z --title "vX.Y.Z" --notes-file <file> --target main` |

## Precedent
First release under this process: [v0.1.0](https://github.com/schiesla/the-laptop-life/releases/tag/v0.1.0) ([PR #2](https://github.com/schiesla/the-laptop-life/pull/2)) — migrated the site off legacy static data onto live Amplify Data, shipped the first real blog post + products, added the content-seeding pipeline, and fixed a Terms of Service inaccuracy about photo ownership.
