import { store } from "../../lib/store";

export async function getServerSideProps({ params }) {
  const paste = store[params.id];
  if (!paste) return { notFound: true };

  return { props: { content: paste.content } };
}

export default function Page({ content }) {
  return <pre>{content}</pre>;
}