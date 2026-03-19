# Facebook Comments Deleter
**Automate the tedious task of clearing your digital footprint.**<p />

A simple browser-based script that automatically deletes your Facebook comments one by one. It’s secure, no need to share your password or grant special permissions, and includes random delays to mimic human behavior, making it less likely to be flagged as a bot.<p />

Run the script and leave the tab visible to see the automation in action. Because this tool prioritizes account safety by simulating human behavior, large-scale deletions are processed gradually. For best results, keep your browser open until the task is complete.

## Steps

1. Click your profile picture in the top-right corner  
2. Go to **Settings & Privacy**

<p align="left">
  <img src="steps/01.png" width="200">
</p>

3. Open **Activity Log**  

<p align="left">
  <img src="steps/02.png" width="200">
</p>

4. Select **Comments**  

<p align="left">
  <img src="steps/03.png" width="220">
</p>

5. Press **F12**, or right-click anywhere on the page and choose **Inspect**  
6. In the tabs, click **>>** and select **Sources**  
7. In the second row of tabs (Page, Workspace, etc.), click **>>** again and choose **Snippets**  

<p align="left">
  <img src="steps/04.png" width="320">
</p>

8. Click **+ New snippet**, then paste the full script from `snippet.js` or `snippet_bulk.js` into the editor on the right  
9. Click the **Run snippet - Ctrl + Enter** button and let it do its thing

<p align="left">
  <img src="steps/05.png" width="320">
</p>

10. To pause the automation, click the **Pause script execution** button in the **Sources** tab or use the F8 shortcut. Once you are finished, simply close the browser tab, no manual cleanup is required.

<p align="left">
  <img src="steps/06.png" width="320">
</p>

## Difference between snippet.js and snippet_bulk.js

**snippet.js**

- This script deletes comments one at a time, then repeat the process

<p align="left">
  <img src="steps/delete_each.png" width="320">
</p>

**snippet_bulk.js**

- This script selects all comments on a page (usually around 25) and deletes them in one go, then repeat the process

<p align="left">
  <img src="steps/delete_bulk.png" width="320">
</p>

## Notes

- You can tweak the `repeatCount` value to delete more or fewer comments.  
- If you’re using the bulk delete script (snippet_bulk.js), run it once first, Facebook will prompt you to enter your account password. After that initial step, you can run the script normally.
- You can also adjust the jitter and delay settings if needed, but it’s best to leave them as-is unless you know what you’re doing.
- Please do not minimize the browser window. Facebook’s dynamic UI relies on active rendering to trigger the "infinite scroll" that loads older history items. If the window is minimized, the script may throw a "Could not find element" error because the next set of posts has failed to load into the DOM.

## Compatibility

- Tested on Brave browser. It should work on other browsers as well.  
- Let me know if you run into any issues.

## License
This project is licensed under the **MIT License**.<br />
Developed by **Lee Zhi Eng** Visit my website for more tools and projects: [zhieng.com](https://www.zhieng.com)
