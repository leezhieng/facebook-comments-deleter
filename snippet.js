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

    // Selector definitions from your recorder steps
    const selectors = {
        step1: 'div.x9f619 > div > div > div.x78zum5 > div.x9f619 > div.x1ja2u2z > div > div > div > div > div > div:nth-of-type(4) > div:nth-of-type(2) > div.x78zum5 > div.x78zum5 svg',
        step2: 'div.x1uvtmcs > div > div > div > div > div > div > div.x78zum5 > div > div'
    };

    console.log("%c--- Script Started ---", "color: cyan; font-weight: bold;");

    for (let i = 0; i < repeatCount; i++) {
        console.log(`%cIteration ${i + 1} of ${repeatCount}`, "color: green;");

        try {
            // STEP 1: Select the three-dots menu
            const element1 = document.querySelector(selectors.step1);
            if (!element1) throw new Error("Could not find the first element (three-dots/menu).");
            
            element1.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));
            console.log("Clicked step 1...");

            // JITTER 1: 1.5 - 3 seconds
            await wait(Math.random() * 1500 + 1500);

            // STEP 2: Click the 'Delete' button
            const element2 = document.querySelector(selectors.step2);
            if (!element2) throw new Error("Could not find the second element (Delete/Move to trash).");
            
            element2.click();
            console.log("Clicked step 2...");

            // JITTER 2: 3 - 5 seconds (allows the UI to refresh/confirm)
            await wait(Math.random() * 2000 + 3000);

        } catch (error) {
            console.error(`Stopped at iteration ${i + 1}: ${error.message}`);
            // If the element isn't found, we might need to scroll or wait longer
            console.log("Waiting 5 seconds before trying next item...");
            await wait(5000);
        }
    }

    console.log("%c--- Script Finished ---", "color: green; font-weight: bold;");
})();
