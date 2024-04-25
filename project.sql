-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2024 at 04:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `animal_life`
--

CREATE TABLE `animal_life` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `adopted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `image`, `user_id`, `adopted`, `created_at`, `updated_at`) VALUES
(1, 'Friendly Stray Dog', 'Found a friendly stray dog near the park. Looking for someone to adopt him!', 'https://news.orvis.com/wp-content/uploads/2019/08/stray.jpg', 1, 0, '2024-03-14 21:10:41', '2024-03-14 21:10:41'),
(5, '', NULL, NULL, 2, 1, '2024-03-14 21:43:01', '2024-03-14 21:47:40'),
(6, '', NULL, NULL, 2, 1, '2024-03-14 21:48:32', '2024-03-14 21:48:37'),
(7, '', NULL, NULL, 2, 1, '2024-03-14 21:50:56', '2024-03-14 21:51:08'),
(8, '', NULL, NULL, 2, 1, '2024-03-14 21:54:55', '2024-03-14 21:55:11'),
(9, 'Kawaii Cat', 'Come to adopt her!', 'https://res.cloudinary.com/petrescue/image/upload/c_crop,g_custom/v1598315017/ul4uxmbk6nzyg0662920.jpg', 2, 1, '2024-03-14 21:59:55', '2024-03-14 22:01:13'),
(10, 'asdsadasd', 'Come to adopt her!', 'https://res.cloudinary.com/petrescue/image/upload/c_crop,g_custom/v1598315017/ul4uxmbk6nzyg0662920.jpg', 1, 1, '2024-03-15 03:51:54', '2024-03-15 03:52:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `username`, `password`, `img`, `created_at`, `updated_at`) VALUES
(1, 'Jane Doe', 'jane.doe@example.com', 'janedoe', '$2a$10$RK57K21umWWLZ.oqDx23xefzcTQzcIaGxQ/FbypF5A3xNMC.k9tDy', 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg?w=170&h=170', '2024-03-14 20:47:49', '2024-03-14 20:47:49'),
(2, 'Jay Eiei', 'jay.jj@example.com', 'jay', '$2a$10$eeP1EDabqgKPlRaegZCrBuwR7l.cZHzKekrb4QDLBc/GIMNvBNdrO', 'https://pixlr.com/images/index/ai-image-generator-two.webp', '2024-03-14 21:21:27', '2024-03-15 00:00:39'),
(3, 'Jay', 'asdasd@asd.com', 'ja', '$2a$10$DKD13TEtkCkcq4V.Zr8Hn.B22FpEe2zGxyPA7zPwxE5NA5zfMz5Z2', 'Fileupload-1711656850902.jpeg', '2024-03-28 20:14:11', '2024-03-28 20:14:11'),
(4, 'asdasd', 'asdad@asdad.com', 'jas', '$2a$10$lPdcP2bN0XLixqcsy..4O.UBUcg.L.PhRz3Tggd5bmnwelka8MapC', 'Fileupload-1711684680263.jpeg', '2024-03-29 03:58:00', '2024-03-29 03:58:00'),
(6, 'jayjay', 'asd@asd.com', 'jaja', '$2a$10$lBitlSKC9OA0tB/grd3n6eFgieDrAlpQShyCzm2IL3YOHszjNhkmG', NULL, '2024-04-22 21:36:28', '2024-04-22 21:36:28'),
(8, 'qwert', '123123@123123.com', 'qwert', '$2a$10$WUwhwDH58mEj./gW2hUIsu3iRi8AXvGAukmnzvFWtwwnD4qXBMtqW', 'Fileupload-1713821918931.png', '2024-04-22 21:38:39', '2024-04-22 21:38:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animal_life`
--
ALTER TABLE `animal_life`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animal_life`
--
ALTER TABLE `animal_life`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animal_life`
--
ALTER TABLE `animal_life`
  ADD CONSTRAINT `animal_life_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `animal_life_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
