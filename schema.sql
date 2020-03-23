-- Table: public.operations

-- DROP TABLE public.operations;

CREATE TABLE public.operations
(
    "time" time without time zone NOT NULL,
    "portfolioId" integer NOT NULL,
    stockid integer NOT NULL,
    quantity integer,
    "unitPrice" double precision,
    CONSTRAINT operations_pkey PRIMARY KEY ("time", "portfolioId", stockid)
)

TABLESPACE pg_default;

ALTER TABLE public.operations
    OWNER to postgres;
	
	
-- Table: public.portfolio

-- DROP TABLE public.portfolio;

CREATE TABLE public.portfolio
(
    id integer NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT portfolio_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.portfolio
    OWNER to postgres;
	
	
	
	
	
-- Table: public.portfolio_entries

-- DROP TABLE public.portfolio_entries;

CREATE TABLE public.portfolio_entries
(
    portfolio_id integer NOT NULL,
    stock_id integer NOT NULL,
    quantity integer,
    CONSTRAINT portfolio_entries_pkey PRIMARY KEY (portfolio_id, stock_id)
)

TABLESPACE pg_default;

ALTER TABLE public.portfolio_entries
    OWNER to postgres;
	
	
	
-- Table: public.stocks

-- DROP TABLE public.stocks;

CREATE TABLE public.stocks
(
    id integer NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT stocks_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.stocks
    OWNER to postgres;
	
	
	
	
-- SEQUENCE: public.id_seq

-- DROP SEQUENCE public.id_seq;

CREATE SEQUENCE public.id_seq
    INCREMENT 1
    START 18
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.id_seq
    OWNER TO postgres;