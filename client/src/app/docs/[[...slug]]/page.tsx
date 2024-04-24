export default function Docs({ params }: { params: { slug: string[] } }) {
  if (params.slug?.length === 2) {
    return <h1>V2</h1>;
  } else if (params.slug?.length === 1) {
    return <h1>H1</h1>;
  }
  return <h1>Docs hame page</h1>;
}
