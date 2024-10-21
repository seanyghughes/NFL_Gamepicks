import React from 'react';
import './Stats.css';

function Stats() {
  return (
    <div>
      <h1>NFL Team Stats</h1>
    <table>
        <thead>
            <tr>
                <th>Team</th>
                <th>Games Played</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Ties</th>
                <th>Points For</th>
                <th>Points Against</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>New England Patriots</td>
                <td>16</td>
                <td>10</td>
                <td>6</td>
                <td>0</td>
                <td>400</td>
                <td>350</td>
            </tr>
            <tr>
                <td>Green Bay Packers</td>
                <td>16</td>
                <td>12</td>
                <td>4</td>
                <td>0</td>
                <td>420</td>
                <td>320</td>
            </tr>
            <tr>
                <td>Kansas City Chiefs</td>
                <td>16</td>
                <td>14</td>
                <td>2</td>
                <td>0</td>
                <td>450</td>
                <td>280</td>
            </tr>
            <tr>
                <td>San Francisco 49ers</td>
                <td>16</td>
                <td>8</td>
                <td>8</td>
                <td>0</td>
                <td>380</td>
                <td>360</td>
            </tr>
            <tr>
                <td>Dallas Cowboys</td>
                <td>16</td>
                <td>9</td>
                <td>7</td>
                <td>0</td>
                <td>410</td>
                <td>370</td>
            </tr>
            <tr>
                <td>Miami Dolphins</td>
                <td>16</td>
                <td>6</td>
                <td>10</td>
                <td>0</td>
                <td>350</td>
                <td>420</td>
            </tr>
            <tr>
                <td>Chicago Bears</td>
                <td>16</td>
                <td>7</td>
                <td>9</td>
                <td>0</td>
                <td>340</td>
                <td>380</td>
            </tr>
            <tr>
                <td>Buffalo Bills</td>
                <td>16</td>
                <td>11</td>
                <td>5</td>
                <td>0</td>
                <td>430</td>
                <td>300</td>
            </tr>
            <tr>
                <td>Seattle Seahawks</td>
                <td>16</td>
                <td>10</td>
                <td>6</td>
                <td>0</td>
                <td>390</td>
                <td>340</td>
            </tr>
            <tr>
                <td>New Orleans Saints</td>
                <td>16</td>
                <td>13</td>
                <td>3</td>
                <td>0</td>
                <td>460</td>
                <td>290</td>
            </tr>
        </tbody>
    </table>
    </div>
  )
}

export default Stats
