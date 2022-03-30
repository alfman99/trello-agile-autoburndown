<div id="top"></div>

[![WTFPL License][license-shield]][license-url]
[![Issues][issues-shield]][issues-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Trello Burndown</h1>
  <p align="center">
    <pre>Automated Burndown chart for Trello</pre>
    <a href="https://github.com/alfman99/trello-agile-autoburndown/issues">Report Bug</a>
    ·
    <a href="https://github.com/alfman99/trello-agile-autoburndown/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#showcase">Showcase</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

This is a way to automatize the creation, storage and display of the burndown chart of a project using agile methodology
> **THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND**

<p align="right">(<a href="#top">back to top</a>)</p>

## Showcase

<p align="center">
  <img height="600" src="images/preview.png?raw=true">
</p>

<p align="right">(<a href="#top">back to top</a>)</p>

## Prerequisites

* Trello token and key: [trello.com/app-key](https://trello.com/app-key/)
* Trello board with at least one list with the name "DONE [sprint_number]", where [sprint_number] is the number of the sprint currently doing
* Trello board with at least one list with the name "TODO [sprint_number]"
* Google Spreadsheet with this format [IMPORTANT]: ...url...
* The script on this repo :^)

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

1. Update the script with your data (boardId, key, token)
2. Create a Google Spreadsheet with the template provided
3. Update the required parameters on the Spreadsheet
4. Go to Extensions > Apps Script
5. Paste the script on the website it was just oppened
6. Go to Triggers on the left pannel, and create a new trigger
7. Function to execute: DoAll
8. Source of event: Time based
9. Select the type of trigger based on time: Daily timer
10. Hour selected: 23:00 to 00:00
11. Wait and the burndown chart will be added to your burndown card on DOING list

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MPL-2.0 License. See [`LICENSE`](https://github.com/alfman99/trello-agile-autoburndown/blob/master/LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

alfman99 - [@Krowzar](https://twitter.com/Krowzar_) - krowzark@gmail.com

Project Link: [https://github.com/alfman99/trello-agile-autoburndown](https://github.com/alfman99/trello-agile-autoburndown)

<p align="right">(<a href="#top">back to top</a>)</p>


[issues-shield]: https://img.shields.io/github/issues/alfman99/trello-agile-autoburndown.svg
[issues-url]: https://github.com/alfman99/trello-agile-autoburndown/issues
[license-shield]: https://img.shields.io/github/license/alfman99/trello-agile-autoburndown.svg
[license-url]: https://github.com/alfman99/trello-agile-autoburndown/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png