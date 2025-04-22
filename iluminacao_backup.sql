--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 15.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pontos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pontos (
    id integer NOT NULL,
    etiqueta character varying(255) NOT NULL,
    tipo_poste character varying(255) NOT NULL,
    logradouro character varying(255) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    estrutura json
);


ALTER TABLE public.pontos OWNER TO postgres;

--
-- Name: pontos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pontos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pontos_id_seq OWNER TO postgres;

--
-- Name: pontos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pontos_id_seq OWNED BY public.pontos.id;


--
-- Name: pontos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pontos ALTER COLUMN id SET DEFAULT nextval('public.pontos_id_seq'::regclass);


--
-- Data for Name: pontos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pontos (id, etiqueta, tipo_poste, logradouro, latitude, longitude, estrutura) FROM stdin;
6	P-1023	Concreto 	Rua das Flores, 12	-23.551	-46.6331	{"nome": "Braço metálico", "filhos": [{"nome": " LED 150W"}]}
8	P-2024	Concreto	Rua da Luz, 150	-23.5567	-46.6421	{"nome": "Braço de aço", "filhos": [{"nome": " Alógena "}]}
5	P001	Aço	Av. Paulista, 1000	-23.5649	-46.6525	{"nome": "Braço duplo", "filhos": [{"nome": " Led 40W"}]}
2	P456	Metal	Rua das Árvores	-23.55	-46.67	{"nome": "Braço simples", "filhos": [{"nome": " LED 45W"}]}
7	P002	Aço	Rua das Flores, 124	-23.5	-46.6	{"nome": "Braço duplo aço", "filhos": [{"nome": " Led 40W"}]}
9	P006	Concreto	Rua das Flores, 252	-23.5521	-46.6354	{"nome": "Ferro galvanizado", "filhos": [{"nome": " Led 40W"}]}
10	P-0269	Tijolo	Rua das Palmeiras, 169	-23.5523	-46.6347	{"nome":"Braço simples","filhos":[{"nome":"Led 120W"}]}
\.


--
-- Name: pontos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pontos_id_seq', 10, true);


--
-- Name: pontos pontos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pontos
    ADD CONSTRAINT pontos_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

