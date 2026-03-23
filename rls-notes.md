<!-- DOCTOC SKIP -->

1.  What is RLS?
    RLS is a database-level security mechanism that uses policies to control access to individual rows in a table. When enabled, the database evaluates these policies for every query (SELECT, INSERT, UPDATE, DELETE) and allows or denies access based on the authenticated user.
2.  Why can a service/admin DB role bypass it?
    A service role key is a powerful admin tool that bypasses these rules. The service role has full database privileges and is intended for trusted backend operations, not end-user requests.

3.  Why is DB-level authorization “defense in depth”?
    Admin connections (using the Service Role Key) are designed to bypass Row Level Security (RLS) for administrative tasks. We do not treat them like user-scoped access because user access must be strictly bound by identity-based policies to ensure Defense in Depth.

         Treating admin connections like user connections removes the database’s "safety net," making the system vulnerable to catastrophic bugs.

4.  How would auth.uid() map to authorId next week with Supabase Auth?
    RLS policies use a special function called auth.uid() to compare the user's ID to the authorId column on the table. auth.uid() is a built-in Supabase function that automatically extracts the unique User ID from the requester's JWT.

Owner-based access is the conceptual rule where the database compares this ID to a column in the table (like author_id) to ensure users can only view or modify their own data.

To map auth.uid() to authorId next week with Supabase Auth I would:

- Have Supabase Auth issue JWT
- Ensure that JWT contains the user id
- Have auth.uid() read that id
- ensure the authorId column stores the same id
- set up policies to compare them

5. Write one example policy (pseudo-SQL ok) enforcing “only owner can update”.
   In the SQL Editor in Supabase, I would write the following policy so that only the owner can make updates. This policy allows UPDATE operations only when the authenticated user’s ID (auth.uid()) matches the author_id column of the row. If the IDs don’t match, the database blocks the update.

```
**ALTER** **TABLE** classes ENABLE **ROW** **LEVEL** SECURITY;

**CREATE** POLICY **"Only owner can update class"**
**ON** classes
**FOR** **UPDATE**
**USING** (auth.uid() **=** author_id);
```
