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
- [x] Created public SergioBenaR/JobPulse, configured origin and pushed the intended commits/history. Anonymous HTTPS access to the repository and raw LICENSE verified; GitHub reports PUBLIC visibility and MIT license. Published file tree excludes the learner profile, .env files, authentication logs and course tooling.
- Repository URL: https://github.com/SergioBenaR/JobPulse
- Published code/license checkpoint: `0438b20` (Add MIT license for Sergio Benavides); delivery records may have later commits.

GitHub CLI 2.103.3 is available as a portable copy outside the project and authenticated as SergioBenaR. Source: https://github.com/cli/cli/releases/tag/v2.103.3.

## Demo video — recording mechanics
- [x] Actual hackathon and form URLs supplied by the learner. Learner reports a demo video under 3 minutes; YouTube reports 86 seconds (1:26), below that limit. Automated hackathon access returns HTTP 403, so the form constraint itself is learner-reported.
- [x] Recording guidance supplied for the approved core journey; learner supplied the completed video link. No agent-written narration or submission copy supplied.
- [x] Video published by the learner. Title: JobPulse - Build with AI: Basics | Devpost Hackathon.
- [x] Anonymous watch-page and oEmbed requests succeed. Player metadata for KZRbjjCcjqA reports playabilityStatus OK and lengthSeconds 86. oEmbed metadata provides a video iframe.
- [ ] Learner checks playback in a private browser window and confirms the recording visibly shows the core evaluation-to-metrics update. Metadata checks do not establish actual screen content or audio quality.
- Video URL: https://www.youtube.com/watch?v=KZRbjjCcjqA

Hackathon: https://learn-ai-basics.devpost.com/
Submission management: https://devpost.com/submit-to/30447-build-with-ai-basics/manage/submissions
Learner-reported progress: step 3/5, Project details; description and technology fields already completed, public repository ready. Prioritize recording/upload and preserve the existing learner-written answers.

Quick recording plan (screen actions, not narration):
- 0:00–0:15: show Review offers and the single DEMO notice, salary, requirements and benefits.
- 0:15–0:30: show Company dashboard baseline (8 reviews, 5 approvals, 3 rejections).
- 0:30–1:00: return to Review offers, Reject, select Salary, optionally enter the learner's own recommendation, Submit review.
- 1:00–1:25: show Company dashboard with 9 reviews, 4 rejections, updated Salary count and submitted recommendation if any.
- 1:25–1:50: Approve another offer, reload to demonstrate persistence, Skip details on the last offer, show completed round and Reset DEMO.
- Stop well before 3 minutes; watch the saved recording and confirm the central update is visible. Upload to a host accepted by the actual form and verify viewer access without sign-in.

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
- Learner reports description and technology fields already completed at step 3/5; do not request or rewrite them again. Remaining required fields still need checking in the user's form.
- [ ] Add the accessible video URL and public GitHub URL.
- [ ] Learner completes the exit survey.
- [ ] Learner submits on Devpost and confirms completion. Do not mark submitted before confirmation.
- Submission URL: pending.

## Current blockers
Public repository, MIT license and published video URL are ready; video metadata confirms 86 seconds and playability OK without authentication. Learner should check actual playback/content, finish remaining required form fields and exit survey, then submit. No Devpost submission has been confirmed.
