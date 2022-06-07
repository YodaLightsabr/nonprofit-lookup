# nonprofit-lookup
`https://nonprofit.yodacode.xyz/api?org=<org_name>&state=<state>&type=<type>&ein=<ein>`

`<org_name>` - The organization to search
`<state>` - (Optional) A two letter state abbreviation
`<type>` - (Optional) The type of form. Options:
  - `A`: Only 990
  - `B`: Only 990-PF
`<ein>` - The orgs EIN number without dashes

Either org_name or ein are needed, but not both.