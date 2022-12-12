-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "customer_id" UUID,
    "balance" INT4 NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "fk_customer_id_ref_Customer" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
