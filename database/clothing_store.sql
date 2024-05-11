-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 11 2024 г., 14:59
-- Версия сервера: 10.6.9-MariaDB
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `clothing_store`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Customers`
--

CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `OrderItems`
--

CREATE TABLE `OrderItems` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `variability_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Products`
--

CREATE TABLE `Products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Products`
--

INSERT INTO `Products` (`product_id`, `product_name`, `price`, `category`, `photo_url`) VALUES
(1, 'ОВЕРСАЙЗ ФУТБОЛКА COLOR PINK', '1300.00', 'Футболки', '/image/4660303174097-2.webp'),
(2, 'ОВЕРСАЙЗ ФУТБОЛКА COLOR GREEN', '1300.00', 'Футболки', '/image/4660303174141-2.webp'),
(3, 'ФУТБОЛКА С НАДПИСЬЮ', '900.00', 'Футболки', '/image/4620123963813.webp'),
(4, 'Брюки-карго', '2999.00', 'Брюки для мужчин', '/image/112780960299.jpg'),
(5, 'Джоггеры', '2299.00', 'Брюки для мужчин', '/image/112768350299.jpg'),
(6, 'Базовые джоггеры из твила', '2990.00', 'Брюки для мужчин', '/image/109098150299.jpg'),
(7, 'Широкие брюки', '3599.00', 'Брюки для женщин', '/image/112362490299.jpg'),
(8, 'Свободные брюки с поясом', '2990.00', 'Брюки для женщин', '/image/114715630299.jpg'),
(9, 'Зауженные брюки из хлопка', '2599.00', 'Брюки для женщин', '/image/113389190299.jpg'),
(10, 'Широкие брюки', '3599.00', 'Брюки для женщин', '/image/112362490299.jpg'),
(11, 'Свободные брюки с эластичным поясом', '2990.00', 'Брюки для женщин', '/image/114715630299.jpg'),
(12, 'Зауженные брюки из хлопка', '2599.00', 'Брюки для женщин', '/image/113389190299.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `ProductVariability`
--

CREATE TABLE `ProductVariability` (
  `variability_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `size` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ProductVariability`
--

INSERT INTO `ProductVariability` (`variability_id`, `product_id`, `size`) VALUES
(1, 1, 'S'),
(2, 1, 'M'),
(3, 1, 'L'),
(4, 2, 'S'),
(5, 2, 'M'),
(6, 3, 'L'),
(7, 3, 'XL'),
(8, 3, '2XL'),
(9, 4, '28'),
(10, 4, '30'),
(11, 4, '32'),
(12, 4, '34'),
(13, 4, '36'),
(14, 4, '38'),
(15, 5, '28'),
(16, 5, '30'),
(17, 5, '34'),
(18, 5, '38'),
(19, 6, '26'),
(20, 6, '28'),
(21, 6, '30'),
(22, 6, '36'),
(23, 6, '38'),
(24, 7, 'XL'),
(25, 7, 'S'),
(26, 7, 'M'),
(27, 7, 'L'),
(28, 8, 'XL'),
(29, 8, 'S'),
(30, 8, 'M'),
(31, 8, 'L'),
(32, 9, 'XL'),
(33, 9, 'S'),
(34, 9, 'M'),
(35, 9, 'L');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `variability_id` (`variability_id`);

--
-- Индексы таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Индексы таблицы `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`);

--
-- Индексы таблицы `ProductVariability`
--
ALTER TABLE `ProductVariability`
  ADD PRIMARY KEY (`variability_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `OrderItems`
--
ALTER TABLE `OrderItems`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Products`
--
ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `ProductVariability`
--
ALTER TABLE `ProductVariability`
  MODIFY `variability_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`variability_id`) REFERENCES `ProductVariability` (`variability_id`);

--
-- Ограничения внешнего ключа таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`);

--
-- Ограничения внешнего ключа таблицы `ProductVariability`
--
ALTER TABLE `ProductVariability`
  ADD CONSTRAINT `productvariability_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
