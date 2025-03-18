"use client";

import {ContentType} from "@/types/types";
import {ItemListPage} from "@/components/layout/item-list-page/ItemListPage";


export default function AnimesPage() {
    return <ItemListPage type={ContentType.ANIME}/>
}
