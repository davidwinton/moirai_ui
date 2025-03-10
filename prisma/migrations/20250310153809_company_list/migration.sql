-- CreateTable
CREATE TABLE "company_list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "company_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_list_entry" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "company_list_id" INTEGER NOT NULL,

    CONSTRAINT "company_list_entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "company_list_entry_company_list_id_idx" ON "company_list_entry"("company_list_id");

-- AddForeignKey
ALTER TABLE "company_list_entry" ADD CONSTRAINT "company_list_entry_company_list_id_fkey" FOREIGN KEY ("company_list_id") REFERENCES "company_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
