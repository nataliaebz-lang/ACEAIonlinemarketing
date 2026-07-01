-- Siembra de las 20 secciones del dashboard con sus títulos en 3 idiomas.
-- Los enlaces (link) van vacíos: Natalia los llena desde /admin.
-- Ejecuta:  npx wrangler d1 execute aceai --file=./seed.sql

INSERT OR REPLACE INTO resources (id, route, area, type, title_es, title_en, title_pt, sort_order) VALUES
(1,  '/',                         'comunidad', 'course',    'Comunidad',            'Community',            'Comunidade',            1),
(2,  '/atlas',                    'comunidad', 'map',       'Mapamundi Femenino',   'Female Mapamundi',     'Mapa-múndi Feminino',   2),
(3,  '/apps',                     'apps',      'app',       'Apps Demo & Live',     'Apps Demo & Live',     'Apps Demo & Live',      3),
(4,  '/studio',                   'apps',      'studio',    'ACEAI Studio',         'ACEAI Studio',         'ACEAI Studio',          4),
(5,  '/proposito',                'P',         'course',    'El Camino',            'The Path',             'O Caminho',             5),
(6,  '/proposito/arquetipo',      'P',         'app',       'App Dayllu',           'Dayllu App',           'App Dayllu',            6),
(7,  '/proposito/ebook',          'P',         'book',      'E-book Numina',        'Numina E-book',        'E-book Numina',         7),
(8,  '/proposito/curso-7-dias',   'P',         'course',    'Curso 7 Días',         '7-Day Course',         'Curso 7 Dias',          8),
(9,  '/proposito/curso-40-dias',  'P',         'course',    'Curso 41 Días',        '41-Day Course',        'Curso 41 Dias',         9),
(10, '/proposito/programa-6-meses','P',        'course',    'Programa Numina',      'Numina Programme',     'Programa Numina',       10),
(11, '',                          'P',         'app',       'Agentes Dayllu',       'Dayllu Agents',        'Agentes Dayllu',        11),
(12, '/proposito/dayllu',         'P',         'audio',     'Música Dayllu',        'Dayllu Music',         'Música Dayllu',         12),
(13, '/ia',                       'IA',        'course',    'Centro IA',            'AI Center',            'Centro IA',             13),
(14, '/ia/libro',                 'IA',        'book',      'E-book SOS-IA+P',      'SOS-IA+P E-book',      'E-book SOS-IA+P',       14),
(15, '/ia/curso-7-dias',          'IA',        'course',    'Curso 7 Días IA',      '7-Day AI Course',      'Curso 7 Dias IA',       15),
(16, '/ia/curso-40-dias',         'IA',        'course',    'Curso 41 Días IA',     '41-Day AI Course',     'Curso 41 Dias IA',      16),
(17, '/ia/programa-avanzado',     'IA',        'course',    'Programa SOS-IA+P',    'SOS-IA+P Programme',   'Programa SOS-IA+P',     17),
(18, '/ia/prompts',               'IA',        'book',      'Biblioteca Prompts',   'Prompt Library',       'Biblioteca Prompts',    18),
(19, '/ia/agentes',               'IA',        'app',       'Agentes IA',           'AI Agents',            'Agentes IA',            19),
(20, '/ia/directorio',            'IA',        'directory', 'Directorio IA',        'AI Directory',         'Diretório IA',          20);
