"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
                                                     children,
                                                 }: {
    children: React.ReactNode;
}) {
    // Создаём новый лист стилей только один раз
    const [sheet] = useState(() => new ServerStyleSheet());

    // Инжектируем стили на сервере
    useServerInsertedHTML(() => {
        const styles = sheet.getStyleElement();
        sheet.instance.clearTag(); // Очищаем после инъекции
        return <>{styles}</>;
    });

    // Если это клиентский рендер, просто возвращаем children
    if (typeof window !== "undefined") return <>{children}</>;

    // На сервере оборачиваем children в StyleSheetManager для сбора стилей
    return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
