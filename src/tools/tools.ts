export const buildURL = (baseUrl: string, params: object) => {
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(
    // remove unused values
    Object.entries(params).filter(([, value]) => {
      const valueStr = String(value).trim();
      return value != null && valueStr != "" && valueStr != "[object Object]";
    }),
  ).toString();

  return url;
};

type ResponseSuccess<T = unknown> = {
  ok: true;
  status: number;
  json: () => Promise<T>;
};

type ResponseError = {
  ok: false;
  status: number;
  json: () => Promise<string>;
};

export const fakeFetch = <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any>,
): Promise<ResponseSuccess<T> | ResponseError> => {
  const data = JSON.parse(localStorage.getItem(url) || "{}");

  // Fake fetch behaviour for example
  return new Promise((res) =>
    setTimeout(() => {
      switch (method) {
        case "GET": {
          return res({
            ok: true,
            status: 200,
            json: () => Promise.resolve(data),
          });
        }
        case "PUT":
        case "POST": {
          if (!body || body?.id == null) {
            return res({
              ok: false,
              status: 404,
              json: () =>
                Promise.resolve(`${url} ${method} failed: there's wrong body`),
            });
          }

          localStorage.setItem(
            url,
            JSON.stringify({ ...data, [body.id]: body }),
          );

          return res({
            ok: true,
            status: 200,
            json: () => Promise.resolve(body as T),
          });
        }
        case "DELETE": {
          if (!body || body?.id == null) {
            return res({
              ok: false,
              status: 400,
              json: () =>
                Promise.resolve(`${url} ${method} failed: wrong body.id`),
            });
          }
          if (!data[body.id]) {
            return res({
              ok: false,
              status: 404,
              json: () =>
                Promise.resolve(
                  `${url} ${method} failed: there's no item with this id`,
                ),
            });
          }

          delete data[body.id];

          localStorage.setItem(url, JSON.stringify(data));

          return res({
            ok: true,
            status: 200,
            json: () => Promise.resolve(body as T),
          });
        }
      }
    }, 100),
  );
};
