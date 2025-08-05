// app/routes/contacts.$contactId.tsx
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useFetcher } from "@remix-run/react";
import type { FunctionComponent } from "react";

import { ContactRecord, createEmptyContact, getContact, updateContact } from "../data";
import invariant from "tiny-invariant";

export const action = async ({
    params,
    request,
}: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
};

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.contactId, "contactIdパラメーターが見つかりません");
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("見つかりません", { status: 404});
    }
    return { contact };
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} のアバター`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>名前なし</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">編集</button>
          </Form>
          
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={
          favorite
            ? "お気に入りから削除"
            : "お気に入りに追加"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
