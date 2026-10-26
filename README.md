# JobPulse

**The pulse of tech talent.** A working prototype for reviewing job conditions and turning votes, rejection reasons and anonymous recommendations into useful metrics.

> **DEMO:** all companies, offers and initial feedback are fictional. The reviews you submit do update the prototype's results. These are not labor market statistics.

## Run locally

Requires Node.js 22.12+ (verified with 22.17.0) and npm.

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open **http://127.0.0.1:5173**. Keep the terminal open. Press `Ctrl+C` to stop the server.

```sh
npm test       # Logic, persistence, results and rendering contracts
npm run build # Generate dist/
npm run preview -- --host 127.0.0.1
```

The production preview runs at http://127.0.0.1:4173. Each address/origin has its own storage; use the same URL throughout your recording.

With the development server running, `npm run test:browser` checks the full journey using Chrome installed on Windows and a separate temporary profile. It does not download browsers or test frameworks. Set `BROWSER_PATH` if Chrome is installed elsewhere. Verification screenshots are saved in the development environment's temporary `opencode` folder.

## Demo and manual test walkthrough

1. In **Company dashboard**, note the **8 initial reviews: 5 approvals and 3 rejections**.
2. In **Review offers**, click **Reject** or swipe left. Close the panel: no votes should change.
3. Reject again; select **Salary** and write a recommendation without personal information. Click **Submit review**.
4. Open the dashboard: there are **9 reviews and 4 rejections**, an additional Salary selection and your submitted comment.
5. Return to Review offers; click **Approve** or swipe right. The approval is saved immediately.
6. Reload: your progress and metrics are preserved.
7. Review the last offer using **Skip details**: the rejection counts without adding reasons or comments, even if you entered a draft.
8. **You have reviewed all offers** appears. **View results** opens the dashboard; **Reset DEMO** restores the 3 offers and initial metrics.

## How it works

- HTML, CSS and modular JavaScript; Vite for development and production builds.
- Plus Jakarta Sans and JetBrains Mono, bundled locally through Fontsource packages with their licenses.
- `src/data.js`: three fictional offers and initial votes.
- `src/model.js`: rules, duplicate prevention, pending offers and metric calculations.
- `src/storage.js`: versioned reads and writes using `jobpulse.demo.v1`.
- `src/review.js`: offer card, gestures and rejection panel.
- `src/dashboard.js`: results derived from votes.
- `src/main.js`: navigation and coordination between views and storage.

## Limitations

No backend, accounts, job applications or synchronization across devices or tabs. New feedback is saved only in this browser/origin, without collecting names or email addresses. This is not a production anonymity service. Clearing site data removes the local round. **Reset DEMO** only replaces this project's storage key.

Rejection reasons allow multiple selections: their percentages use the total number of rejections and do not necessarily add up to 100%. A rejection without details counts toward the total without inventing reasons.

If saving fails, the app does not advance or report success. If local storage contains invalid data, the app explains the problem and offers to reset the DEMO without silently overwriting it.

The interface and fictional dataset are in English. Company and place names are proper names. Existing user-written comments remain exactly as entered; translating the app does not rewrite saved feedback or reset your round.

## Planning and submission

Plans and progress are in `devpost/`. The personal learner profile is excluded from Git. The hackathon submission requires a short demo video and a public GitHub repository; deployment is optional.

## License

Application code is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 Sergio Benavides

## Third-party font licenses

Plus Jakarta Sans and JetBrains Mono remain licensed under the SIL Open Font License 1.1. Their copyright notices and license are included in [public/licenses/FONTS-OFL.txt](public/licenses/FONTS-OFL.txt) and copied into production builds at `licenses/FONTS-OFL.txt`. Their license is separate from the application's MIT license.
