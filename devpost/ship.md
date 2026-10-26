---
doc: ship
status: in_progress
---

# JobPulse — Delivery Checklist

Technical delivery notes only. Project descriptions, narration, submission answers and exit-survey responses must be written by the learner.

## Build readiness
- [x] Scope, PRD, specification and build checklist approved.
- [x] All build slices, hands-on review, final review and learning wrap-up completed.
- [x] User explicitly approved the English version and the end of 5-build.
- [x] Existing checks passed for application revision `ef1dfc8`: 9 Node tests, Vite production build and the full Chrome journey. Local server responds with HTTP 200 during shipping preparation.
- [x] App map refreshed, checked offline and shared: `devpost/app-map.html`.

## Public repository and license
- [x] Reviewed tracked filenames and all existing commits before publication. The learner profile and .env files have never been tracked; ignore rules remain active. History search found no matches for the credential patterns checked. Git author/committer email uses GitHub's noreply address; authorship names are part of the authorized history. No credentials, private email addresses or local authentication logs are included. This is a targeted audit, not a guarantee against every possible secret format.
- [x] Course tooling folders and other unrelated untracked files are excluded from intended staging.
- [x] User approved MIT with the exact holder: Copyright (c) 2026 Sergio Benavides.
- [x] Added the approved LICENSE and identified third-party font licenses separately in README.
- [x] Preserved both font copyright notices and SIL OFL 1.1 in `public/licenses/FONTS-OFL.txt`, included in production builds; README identifies them separately from MIT.
- [x] GitHub CLI authenticated interactively through GitHub's browser flow as SergioBenaR. No token was requested in chat or added to the project.
- [x] User explicitly authorized creating public SergioBenaR/JobPulse and pushing included code and history.
- [x] Checked SergioBenaR/JobPulse before creation; it did not exist.
- [ ] Create/link the authorized public repository, push intended commits and verify anonymous access.
- Repository URL: pending.

GitHub CLI 2.103.3 is available as a portable copy outside the project and authenticated as SergioBenaR. Source: https://github.com/cli/cli/releases/tag/v2.103.3.

## Demo video — recording mechanics
- [ ] Check the actual Devpost form for its required video duration, format and hosting constraints. The actual hackathon/form URL has not been provided or verified; do not assume a duration limit.
- [ ] Confirm the recording sequence with the learner, using the already-approved journey below.
- [ ] Record the functioning application in the browser, with the DEMO notice visible. Use the learner's own narration if any; this document is not a narration script.
- [ ] Upload the short recording and verify that reviewers can open it without signing in.
- Video URL: pending.

Suggested screen actions, from the approved core journey:
1. Open `http://127.0.0.1:5173` and use Reset DEMO if necessary.
2. Show Company dashboard: 8 reviews, 5 approvals and 3 rejections.
3. In Review offers, Reject an offer, select Salary and add a brief recommendation without personal information; Submit review.
4. Return to Company dashboard: show 9 reviews, 4 rejections, the updated Salary count and the new comment.
5. Approve another offer, reload to show persistence, finish the round and show View results and Reset DEMO.

On Windows, Xbox Game Bar (`Win+G`) can record an active browser window; `Win+Alt+R` starts/stops recording where supported. Keep unrelated windows and account details out of the capture. If the shortcut is unavailable, use the screen recorder already available on the computer. A local recording is sufficient; deployment is optional.

## Devpost submission — learner-owned
- [ ] Open the actual hackathon's submission form and check its current required fields.
- [ ] Learner writes/confirms the project name, short description and all other required answers. The agent may point out gaps and correct spelling/grammar, but does not draft or rewrite submission copy.
- [ ] Add the accessible video URL and public GitHub URL.
- [ ] Learner completes the exit survey.
- [ ] Learner submits on Devpost and confirms completion. Do not mark submitted before confirmation.
- Submission URL: pending.

## Current blockers
Public repository creation/push and anonymous verification are next. Actual Devpost form URL and learner-recorded video are still needed. No Devpost submission has been made.
