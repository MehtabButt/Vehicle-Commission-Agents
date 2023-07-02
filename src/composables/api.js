export async function fetchRecord(id) {
  if (id == undefined || id == null) return { status: 500, error: 'id is required' };
  const res = await window.Api.fetchRecord({ id: id });
  return res;
}
