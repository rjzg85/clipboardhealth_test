# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1:
As a User I would like to have a new field in the Agents Table to store a custom id
AC:

1. Create a new field in the table where Agents called `custom_id`
2. custom_id field should be string and nullable

Time/effort estimates: 1 hour

Ticket 2
In order to be able to store a custom id to each Agents we need a function.
AC:

1. create a function called updateAgentCustomId
2. receive via parameter the current db id and a custom Id
3. save/update custom_id field based on the new input
4. create tests.

Time/effort estimates: 4 hour

Ticket 3
Update `getShiftsByFacility` function to return custom_id
AC:

1. Update `getShiftsByFacility` function to return custom_id in the metadata
2. Create tests

Time/effort estimates: 2 hour

Ticket 3
Update `generateReport` function to display custom_id field instead of db id
AC:

1. Update `generateReport` function and replace db id for custom_id
2. if `custom_id` is not defined use `agent.id`
3. create tests

Notes/question:
Do we want to highlight Agents that hasn't been updated with its `custom_id`?
or do we want to create a new function to return Agents with shifts and doesn't have `custom_id`
time/effort estimates: 4 hour
