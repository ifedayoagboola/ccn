# Plans, access, and permissions

## Who can access the MCP server?

Access to the Figma MCP server depends on your Figma plan and seat type:

1. Users on the Starter plan or with View or Collab seats on paid plans will be limited to up to 6 tool calls per month.
2. Users with a Dev or Full seat on the Professional, Organization, or Enterprise plans have per minute rate limits, which follow the same limits as the Tier 1 [Figma REST API](/docs/rest-api/rate-limits/).  As with Figma’s REST API, Figma reserves the right to change rate limits.

## Which MCP clients are supported?

To use the MCP server, you’ll need a code editor or application that supports MCP servers (for example, VS Code, Cursor, or Claude Code).

A full list of supported clients is available [here](https://www.figma.com/mcp-catalog/).

## Why am I getting permission errors?

You can only access Figma content that you already have permission to view or edit. If you get an error indicating that resources can’t be accessed:

1. **Check the file link:** Make sure it’s a valid Figma Design, FigJam, or Figma Make file.
2. **Verify your user:** Run the whoami tool to confirm the email used for authentication. It also tells you all the plans the user belongs to and their seat types in these plans.
3. **Confirm permissions:** Ensure the user belongs to the plan to which the file being accessed belongs to as well
