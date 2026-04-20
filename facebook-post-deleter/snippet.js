(async () => {
	// ─── Configuration ────────────────────────────────────────────────────────
	const SELECT = {
		// "John Doe shared a post" — you re-shared someone else's post
		sharedPost: false,

		// "John Doe shared a link" — you shared an external URL
		sharedLink: false,

		// "John Doe added a new photo / video"
		addedPhoto: false,

		// "John Doe updated his/her status"
		updatedStatus: false,

		// Posts by others where you were tagged (author is not you)
		taggedByOthers: false,
	};

	const username = "yourusername"; // Taken from profile url, eg. https://facbeook.com/yourusername
	const maxSelection = 10; // Select how many posts each round
	const repeatCount = 50; // Repeat the process how many times, put a large number like 99999 if you want it to be a long, continuous process

	// ──────────────────────────────────────────────────────────────────────────

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function jitter(min, max) {
		const rand = (Math.random() + Math.random()) / 2;
		return sleep(Math.floor(min + rand * (max - min)));
	}

	// Scroll to bottom on start to trigger initial post loading
	window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
	await jitter(2000, 4000);

	for (let round = 1; round <= repeatCount; round++) {
		console.log(`--- Round ${round}/${repeatCount} ---`);

		// ─── Step 1: Select matching checkboxes ───────────────────────────────

		let totalSelected = 0;

		const checkboxes = Array.from(
			document.querySelectorAll(
				'input[name="comet_activity_log_item_checkbox"]',
			),
		);

		for (const checkbox of checkboxes) {
			if (totalSelected >= maxSelection) break;
			if (checkbox.checked) continue;

			// Walk up to find the item container with the description div
			let descDiv = null;
			let itemRoot = checkbox.parentElement;
			while (itemRoot && itemRoot !== document.body) {
				descDiv = itemRoot.querySelector("div.xdj266r.x1vvkbs");
				if (descDiv) break;
				itemRoot = itemRoot.parentElement;
			}
			if (!descDiv) continue;

			const text = descDiv.textContent.trim();
			const authorLink = descDiv.querySelector("a");
			const byMe =
				authorLink && new RegExp(username, "i").test(authorLink.href);

			let shouldSelect = false;
			if (!byMe && SELECT.taggedByOthers) shouldSelect = true;
			else if (byMe) {
				if (SELECT.sharedPost && /shared a post/i.test(text))
					shouldSelect = true;
				if (SELECT.sharedLink && /shared a link/i.test(text))
					shouldSelect = true;
				if (SELECT.addedPhoto && /added.*?(photo|video)/i.test(text))
					shouldSelect = true;
				if (SELECT.updatedStatus && /updated.*?status/i.test(text))
					shouldSelect = true;
			}

			if (!shouldSelect) continue;

			checkbox.click();
			totalSelected++;
			await jitter(200, 600);
		}

		console.log(`Selected ${totalSelected} post(s).`);

		if (totalSelected === 0) {
			console.log("Nothing selected, retrying soon...");
			await jitter(2000, 5000);
			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
			await jitter(1000, 2000);
			continue;
		}

		// ─── Step 2: Click the Trash button ───────────────────────────────────

		await jitter(800, 1500);

		const trashBtn = document.querySelector(
			'[aria-label="Trash"][role="button"]',
		);
		if (!trashBtn) {
			console.error("Trash button not found.");
			break;
		}

		// Scroll to top so the sticky action bar with Trash button is visible
		window.scrollTo({ top: 0, behavior: "smooth" });
		await jitter(2000, 3500);

		trashBtn.click();
		console.log("Clicked Trash button.");

		// ─── Step 3: Click "Move to trash" confirm ────────────────────────────

		// Retry for up to ~6 seconds waiting for the confirm modal to appear
		let confirmBtn = null;
		for (let attempt = 0; attempt < 6; attempt++) {
			await sleep(1000);
			const confirmSpan = Array.from(document.querySelectorAll("span")).find(
				(el) => el.textContent.trim() === "Move to trash",
			);
			confirmBtn =
				confirmSpan &&
				(confirmSpan.closest('[role="button"]') ||
					confirmSpan.closest("button") ||
					confirmSpan.closest("[tabindex]"));
			if (confirmBtn) break;
		}

		if (!confirmBtn) {
			console.warn("Confirm button not found, skipping round.");
			continue;
		}
		confirmBtn.click();
		console.log(`Moved ${totalSelected} post(s) to trash.`);

		// ─── Wait before next round ────────────────────────────────────────────

		if (round < repeatCount) {
			await jitter(5000, 15000);

			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
			await jitter(1500, 3000);
		}
	}

	console.log("All rounds complete.");
})();
