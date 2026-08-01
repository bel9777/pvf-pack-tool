# pvf-pack-tool

Static shell for the Park View Farm pack list. The page holds **no data** —
the day's pack list travels base64-encoded in the URL fragment of the link in
Brian's pack email (fragments are never sent to the server). A service worker
caches the shell so the page keeps working offline (walk-in freezer, no
signal) once it has been opened.

Generated and emailed by the private `pvf-delivery-runner` repo. The pack UI
also exists there as the self-contained attachment fallback
(`PACK_TEMPLATE` in runner.py) — **change the two together**.
