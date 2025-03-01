---
title: 'Fixing LanguageTool API "No Parameters Specified" Error - Add /v2/ Endpoint'
description: 'Troubleshooting guide for resolving "This is the LanguageTool API. You have not specified any parameters" error when accessing the LanguageTool API.  The solution is to ensure you are using the correct API endpoint, specifically appending `/v2/` to the base URL.'
pubDate: 'Dec 09 2024'
tags: ['languagetool', 'api', 'error', 'fix', 'v2', 'endpoint', 'http-api']
---

Fix:
http://example:8081/v2/

Add the /v2/

Error:

2023-07-08 13:59:19.919 GMT INFO  org.languagetool.server.LanguageToolHttpHandler An error has occurred: 'This is the LanguageTool API. You have not specified any parameters. Please see https://languagetool.org/http-api/swagger-ui/#/default', sending HTTP code 400. Access from 192.168.1.129, HTTP user agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0, User agent param: webextension-firefox-ng, v: 7.1.13, Referrer: null, language: auto, h: 2, r: 71, time: 1m: ALL_BUT_TEXTLEVEL_ONLY, l: PICKY, iID: 53743:1688824722155, Stacktrace follows:org.languagetool.server.BadRequestException: This is the LanguageTool API. You have not specified any parameters. Please see https://languagetool.org/http-api/swagger-ui/#/default

	at org.languagetool.server.LanguageToolHttpHandler.handle(LanguageToolHttpHandler.java:195)

	at jdk.httpserver/com.sun.net.httpserver.Filter$Chain.doFilter(Filter.java:77)

	at jdk.httpserver/sun.net.httpserver.AuthFilter.doFilter(AuthFilter.java:82)

	at jdk.httpserver/com.sun.net.httpserver.Filter$Chain.doFilter(Filter.java:80)

	at jdk.httpserver/sun.net.httpserver.ServerImpl$Exchange$LinkHandler.handle(ServerImpl.java:848)

	at jdk.httpserver/com.sun.net.httpserver.Filter$Chain.doFilter(Filter.java:77)

	at jdk.httpserver/sun.net.httpserver.ServerImpl$Exchange.run(ServerImpl.java:817)

	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)

	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)

	at java.base/java.lang.Thread.run(Thread.java:829)
