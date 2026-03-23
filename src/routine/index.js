
/**
 * 本示例为边缘函数获取第三方网站资源后，修改响应头并返回客户端
 * 测试时请将 url 替换为您自己的地址
 */
const url = "https://aliyun.com"

async function handleRequest(request) {
    const resUrl = new URL(request.url);
 
  // 判断 URI 是否为 /er-route
  if (resUrl.pathname === '/er1') {
    // 获取指定图片并返回
    const imageUrl = 'https://img.alicdn.com/imgextra/i4/O1CN012X1Rxl1clAgB5waMK_!!6000000003640-2-tps-52-52.png';
    const response = await fetch(imageUrl);
    // 如果图片获取成功，直接返回；否则返回错误
      if (response.ok) {
        // 仅复制返回内容的 body
        const newResponse =  new Response(response.body, {
          status: response.status,
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400' // 缓存一天
          }
        })

        // 自定义增加 header
        newResponse.headers.append("custom-ER-add", "ER header for image")

        return newResponse
      }
  } else {
        const response = await fetch(url)

        // 仅复制返回内容的 body
        const newResponse = new Response(response.body, response)

        // 自定义增加 header
        newResponse.headers.append("custom-ER-add", "ER header")

        // 自定义删减 header
        newResponse.headers.delete("custom-ER-delete")

        // 自定义修改header
        newResponse.headers.set("custom-ER-reset", "ER header")

        return newResponse
  }
}

export default {
  fetch(request) {
    return handleRequest(request)
  }
}
