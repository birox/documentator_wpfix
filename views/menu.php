<div class="nav navbar-form navbar-right navbar-toolbox">
    <div class="btn-group">
    
        <?php if(login_check() == true): ?>
        
            <a href="<?php path(); ?>/create" class="btn btn-default" data-toggle="tooltip-bottom" title="<?php echo _t('Write new documentation'); ?>"><i class="glyphicon glyphicon-edit"></i></a>
        
        <?php elseif(doc_bookmarked(curPageURL()) == true): ?>
        
            <a id="unbookmark-doc" href="javascript:void(0)" class="btn btn-default btn-bookmarked" data-saved="<?php echo _t('Bookmark'); ?>" data-toggle="tooltip-bottom" title="<?php echo _t('Bookmarked'); ?>"><i class="glyphicon glyphicon-fire"></i></a>
        
        <?php else: ?>
        
            <a id="bookmark-doc" href="javascript:void(0)" class="btn btn-default" data-saved="<?php echo _t('Bookmarked'); ?>" data-toggle="tooltip-bottom" title="<?php echo _t('Bookmark'); ?>"><i class="glyphicon glyphicon-fire"></i></a>
        
        <?php endif; ?>
        
        <div class="btn-group">
        
            <a href="javascript:void(0)" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
            </a>
            
            <ul class="dropdown-menu">
            
                <?php if(login_check() == true): ?>
                
                    <?php if(doc_file() == true): ?>
                    
                    <li><a id="menu-html-download" href="#fileDownload" data-toggle="modal"><span class="label label-primary">HTML</span> <?php echo _t('Download file'); ?></a></li>
                    <li><a id="edit-md-download" href="javascript:void(0)"><span class="label label-info">MD</span> <?php echo _t('Download file'); ?></a></li>
                    <?php hook('user_file_download_menu'); ?>
                    
                    <li role="presentation" class="divider"></li>
                    
                    <?php elseif(doc_folder() == true): ?>
                    
                    <li><a id="menu-html-download-folder" href="#folderDownload" data-toggle="modal"><span class="label label-primary">HTML</span> <?php echo _t('Download folder'); ?></a></li>
                    <li><a id="menu-md-download-folder" href="javascript:void(0)"><span class="label label-info">MD</span> <?php echo _t('Download folder'); ?></a></li>
                    <?php hook('user_folder_download_menu'); ?>
                    
                    <li role="presentation" class="divider"></li>
                    
                    <?php endif; ?>
                    
                    <?php if(doc_file() == true): ?>
                    
                    <li><a id="menu-edit-file" href="<?php $uri = str_replace(DOC_URL, '', curPageURL()); echo DOC_URL . DIRECTORY_SEPARATOR . 'create' . DIRECTORY_SEPARATOR . $uri; ?>"><?php echo _t('Edit file'); ?></a></li>
                    <li><a id="menu-rename-file" href="#fileName" data-toggle="modal"><?php echo _t('Rename file'); ?></a></li>
                    <li><a id="menu-delete-file" href="#fileDelete" data-toggle="modal"><?php echo _t('Delete file'); ?></a></li>
                    <li role="presentation" class="divider"></li>
                    
                    <?php elseif(doc_folder() == true): ?>
                    
                    <li><a id="menu-rename-folder" href="#folderName" data-toggle="modal"><?php echo _t('Rename folder'); ?></a></li>
                    <li><a id="menu-delete-folder" href="#folderDelete" data-toggle="modal"><?php echo _t('Delete folder'); ?></a></li>
                    <li role="presentation" class="divider"></li>
                    
                    <?php endif; ?>
                    <?php hook('user_menu'); ?>
                    <li><a id="menu-logout" href="<?php path(); ?>/includes/logout.php"><?php echo _t('Logout'); ?></a></li>
                    
                <?php else: ?>
                
                    <?php if((doc_file() == true) && (DOC_DOWNLOAD == 'yes')): ?>
                    
                    <li><a id="menu-html-download" href="#fileDownload" data-toggle="modal"><span class="label label-primary">HTML</span> <?php echo _t('Download file'); ?></a></li>
                    <li><a id="edit-md-download" href="javascript:void(0)"><span class="label label-info">MD</span> <?php echo _t('Download file'); ?></a></li>
                    <?php hook('public_file_download_menu'); ?>
                    
                    <li role="presentation" class="divider"></li>
                    
                    <?php elseif((doc_folder() == true) && (DOC_DOWNLOAD == 'yes')): ?>
                    
                    <li><a id="menu-html-download-folder" href="#folderDownload" data-toggle="modal"><span class="label label-primary">HTML</span> <?php echo _t('Download folder'); ?></a></li>
                    <li><a id="menu-md-download-folder" href="javascript:void(0)"><span class="label label-info">MD</span> <?php echo _t('Download folder'); ?></a></li>
                    <?php hook('public_folder_download_menu'); ?>
                    
                    <li role="presentation" class="divider"></li>
                    
                    <?php endif; ?>
                    <?php hook('public_menu'); ?>
                    <li><a id="menu-login" href="<?php path(); ?>/bookmarks"><?php echo _t('My Bookmarks'); ?></a></li>
                    
                <?php endif; ?>
                
            </ul>
            
        </div>	
        
    </div>
</div>