/**
 * MIT License
 * * Copyright (c) 2026 Lee Zhi Eng (www.zhieng.com)
 * * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
 
(async () => {
    // Configuration
    const repeatCount = 50; 
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Selectors mapped from your Puppeteer recording
    const selectors = {
        checkbox: 'div.x9f619 div > div > div > div > div > div:nth-of-type(3) input',
        removeButton: 'div.x9f619 > div.x1ja2u2z > div > div > div > div > div > div:nth-of-type(3) > div.x78zum5 > div.x78zum5 span > span',
        confirmButton: 'div.x1uvtmcs > div > div > div > div > div > div > div.x1jx94hy > div > div > div > div > div:nth-of-type(1) span > span'
    };

    console.log("%c--- Script Started ---", "color: cyan; font-weight: bold;");
    console.log("%cKeep this tab active and visible.", "color: orange;");

    for (let i = 0; i < repeatCount; i++) {
        console.log(`%cIteration ${i + 1} of ${repeatCount}`, "color: green;");

        try {
            // STEP 1: Select the Checkbox
            const checkbox = document.querySelector(selectors.checkbox);
            if (!checkbox) throw new Error("Could not find item checkbox. Try scrolling.");
            checkbox.click();
            console.log("Item selected...");

            await wait(Math.random() * 1000 + 1000); // 1-2s jitter

            // STEP 2: Click the primary 'Remove' button
            const removeBtn = document.querySelector(selectors.removeButton);
            if (!removeBtn) throw new Error("Could not find initial Remove button.");
            removeBtn.click();
            console.log("Remove clicked...");

            await wait(Math.random() * 1500 + 1500); // 1.5-3s jitter

            // STEP 3: Click the confirmation button in the popup
            const confirmBtn = document.querySelector(selectors.confirmButton);
            if (!confirmBtn) throw new Error("Could not find confirmation button.");
            confirmBtn.click();
            console.log("%cItem Removed Successfully", "color: green;");

            // Post-action pause: 5-10s to allow Facebook's UI to update
            await wait(Math.random() * 5000 + 5000);

            // Nudge scroll to trigger lazy loading of older items
            window.scrollBy(0, 100);

        } catch (error) {
            console.warn(`Skipping iteration ${i + 1}: ${error.message}`);
            // Wait longer if stuck to allow for re-rendering
            await wait(5000);
            window.scrollBy(0, 300); 
        }
    }

    console.log("%c--- Script Finished ---", "color: cyan; font-weight: bold;");
})();
